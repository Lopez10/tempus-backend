import { Inject, Injectable } from '@nestjs/common';
import { DateVO, ID, Time, UseCase } from '@common';
import {
  Booking,
  BookingRepository,
  BookingRepositoryPort,
  AvailabilityService,
  timeAndPeopleOfBooking,
  BookingDto,
  BookingMapper,
} from '@modules/booking';
import {
  CreateBookingError,
  InvalidBookingAvailable,
  InvalidBookingHours,
  InvalidHoursPerBooking,
  AvailabilityMapper,
  CreateBookingDto,
} from '@modules/shared';
import { Area, AreaRepository, AreaRepositoryPort } from '@modules/area';

@Injectable()
export class CreateBookingUseCase
  implements UseCase<CreateBookingDto, BookingDto>
{
  private readonly availabilityService: AvailabilityService =
    new AvailabilityService();
  constructor(
    @Inject(BookingRepository)
    private readonly bookingRepository: BookingRepositoryPort,

    @Inject(AreaRepository)
    private readonly areaRepository: AreaRepositoryPort, // @Inject(ClientRepository) // private readonly clientRepository: ClientRepositoryPort,
  ) {}

  async run(bookingDTO: CreateBookingDto): Promise<BookingDto> {
    const areaId = new ID(bookingDTO.areaId);
    const start = new Time(bookingDTO.start);
    const end = new Time(bookingDTO.end);
    const day = new DateVO(bookingDTO.day);
    const people = bookingDTO.people;

    const bookingsOfDayFounded =
      await this.bookingRepository.findByDayAndAreaId(day, areaId);

    const areaFounded = await this.areaRepository.findOneById(areaId);

    this.validateArea(areaFounded, start, end);

    this.checkAreaIsAvailable(
      bookingsOfDayFounded,
      areaFounded,
      start,
      end,
      people,
    );

    // const clientFounded = await this.clientRepository.findOneByEmail(
    //   bookingDTO.clientEmail,
    // );

    const bookingDomain = Booking.create({
      people,
      start,
      end,
      areaId,
      day,
      clientId: new ID('clientId'),
      // clientId: new ID(clientFounded.id),
      tableId: new ID(bookingDTO.tableId),
    });

    const bookingInserted = await this.bookingRepository.insert(bookingDomain);
    return BookingMapper.toDto(bookingInserted);
  }

  private checkAreaIsAvailable(
    bookingsOfDayFounded: Booking[],
    areaFounded: Area,
    start: Time,
    end: Time,
    people: number,
  ) {
    const timeAndPeopleOfBookings: timeAndPeopleOfBooking[] =
      bookingsOfDayFounded.map((booking) =>
        AvailabilityMapper.toTimeAndPeopleOfBookings(booking),
      );

    const { close, open, interval, maxCapacity } = areaFounded.getPropsCopy();
    const hoursAndAvailability =
      this.availabilityService.calculateAvailableHours({
        close,
        open,
        interval,
        maxCapacity,
        timeAndPeopleOfBookings,
      });

    const timeAndPeopleOfBooking: timeAndPeopleOfBooking = {
      start,
      end,
      people,
    };

    const isAvailable = this.availabilityService.checkAvailabilityForHours({
      timeAndPeopleOfBooking,
      hoursAndAvailability,
    });

    if (!isAvailable) {
      throw new InvalidBookingAvailable();
    }
  }

  private validateArea(areaFounded: Area, start: Time, end: Time) {
    if (!areaFounded) {
      throw new CreateBookingError('Area not found');
    }

    if (!areaFounded.validateHours(start, end)) {
      throw new InvalidBookingHours();
    }

    if (!areaFounded.validateHoursPerBooking(start, end)) {
      throw new InvalidHoursPerBooking();
    }
  }
}
