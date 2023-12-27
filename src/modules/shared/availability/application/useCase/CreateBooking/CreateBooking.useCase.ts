import { DateVO, ID, Time, UseCase } from '@common';
import {
  Booking,
  BookingProps,
  BookRepository,
  BookingRepositoryPort,
  AvailabilityService,
  timeAndPeopleOfBooking,
} from '@modules/booking/domain';
import { Inject, Injectable } from '@nestjs/common';
import { CreateBookingDTO } from './CreateBookingDTO';
import { BookingDTO, BookingMapper } from '@modules/booking/Booking.mapper';
import { AreaRepository, AreaRepositoryPort } from '@modules/area';
import { AvailabilityMapper } from '@modules/shared/availability/Availability.mapper';
import {
  InvalidBookingAvailable,
  InvalidBookingHours,
  InvalidBookingInterval,
} from '../../exceptions';

@Injectable()
export class CreateBookingUseCase
  implements UseCase<CreateBookingDTO, BookingDTO>
{
  private readonly availabilityService: AvailabilityService =
    new AvailabilityService();
  constructor(
    @Inject(BookRepository)
    private readonly repository: BookingRepositoryPort,

    @Inject(AreaRepository)
    private readonly areaRepository: AreaRepositoryPort,
  ) {}

  async run(bookingDTO: CreateBookingDTO): Promise<BookingDTO> {
    const areaId = new ID(bookingDTO.areaId);
    const start = new Time(bookingDTO.start);
    const end = new Time(bookingDTO.end);
    const day = new DateVO(bookingDTO.day);
    const people = bookingDTO.people;

    const bookingsOfDay = await this.repository.retrieveByDayAndAreaId(
      day,
      areaId,
    );

    const area = await this.areaRepository.findOneById(areaId);

    const timeAndPeopleOfBookings: timeAndPeopleOfBooking[] = bookingsOfDay.map(
      (booking) => AvailabilityMapper.toTimeAndPeopleOfBookings(booking),
    );

    if (!area.validateHours(start, end)) {
      throw new InvalidBookingHours();
    }

    if (!area.validateHoursPerReservation(start, end)) {
      throw new InvalidBookingInterval();
    }

    // Check interval WHY?
    // Check client WHY?

    const hoursAndAvailability =
      this.availabilityService.calculateAvailableHours({
        close: area.getPropsCopy().close,
        open: area.getPropsCopy().open,
        interval: area.getPropsCopy().interval,
        maxCapacity: area.getPropsCopy().maxCapacity,
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

    if (!isAvailable) {
      throw new InvalidBookingAvailable();
    }

    const bookingProps: BookingProps = {
      people,
      start,
      end,
      areaId,
      day,
      clientId: new ID(bookingDTO.clientId),
      tableId: new ID(bookingDTO.tableId),
    };

    const booking = Booking.create(bookingProps);

    const bookDomain = await this.repository.insert(booking);

    return BookingMapper.toDTO(bookDomain);
  }
}
