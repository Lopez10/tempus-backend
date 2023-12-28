import { Inject, Injectable } from '@nestjs/common';
import { DateVO, ID, Time, UseCase } from '@common';
import {
  Booking,
  BookRepository,
  BookingRepositoryPort,
  AvailabilityService,
  timeAndPeopleOfBooking,
  BookingDTO,
  BookingMapper,
} from '@modules/booking';
import {
  CreateBookingError,
  InvalidBookingAvailable,
  InvalidBookingHours,
  InvalidBookingInterval,
  AvailabilityMapper,
  CreateBookingDTO,
} from '@modules/shared';
import { Area, AreaRepository, AreaRepositoryPort } from '@modules/area';

@Injectable()
export class CreateBookingUseCase
  implements UseCase<CreateBookingDTO, BookingDTO>
{
  constructor(
    @Inject(BookRepository)
    private readonly repository: BookingRepositoryPort,

    @Inject(AreaRepository)
    private readonly areaRepository: AreaRepositoryPort,

    private readonly availabilityService: AvailabilityService,
  ) {}

  async run(bookingDTO: CreateBookingDTO): Promise<BookingDTO> {
    const areaId = new ID(bookingDTO.areaId);
    const start = new Time(bookingDTO.start);
    const end = new Time(bookingDTO.end);
    const day = new DateVO(bookingDTO.day);
    const people = bookingDTO.people;

    try {
      const bookingsOfDayFounded = await this.repository.retrieveByDayAndAreaId(
        day,
        areaId,
      );

      const areaFounded = await this.areaRepository.findOneById(areaId);

      const timeAndPeopleOfBookings: timeAndPeopleOfBooking[] =
        bookingsOfDayFounded.map((booking) =>
          AvailabilityMapper.toTimeAndPeopleOfBookings(booking),
        );

      // Check interval HOW?
      // Check client HOW?
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

      const isAvailable = this.availabilityService.checkAvailability({
        timeAndPeopleOfBooking,
        hoursAndAvailability,
      });

      this.validateBooking(areaFounded, start, end, isAvailable);

      const bookingDomain = Booking.create({
        people,
        start,
        end,
        areaId,
        day,
        clientId: new ID(bookingDTO.clientId),
        tableId: new ID(bookingDTO.tableId),
      });

      const bookingInserted = await this.repository.insert(bookingDomain);

      return BookingMapper.toDTO(bookingInserted);
    } catch (error) {
      throw new CreateBookingError(error.message);
    }
  }

  private validateBooking(
    area: Area,
    start: Time,
    end: Time,
    isAvailable: boolean,
  ) {
    if (!area.validateHours(start, end)) {
      throw new InvalidBookingHours();
    }

    if (!area.validateHoursPerReservation(start, end)) {
      throw new InvalidBookingInterval();
    }

    if (!isAvailable) {
      throw new InvalidBookingAvailable();
    }
  }
}
