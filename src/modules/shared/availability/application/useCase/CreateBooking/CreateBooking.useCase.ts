import { DateVO, ID, Time, UseCase } from '@common';
import {
  Booking,
  BookingProps,
  BookRepository,
  BookingRepositoryPort,
} from '@modules/booking/domain';
import { Inject, Injectable } from '@nestjs/common';
import { CreateBookingDTO } from './CreateBookingDTO';
import { BookingDTO, BookingMapper } from '@modules/booking/Booking.mapper';
import { AreaRepository, AreaRepositoryPort } from '@modules/area';

@Injectable()
export class CreateBookingUseCase
  implements UseCase<CreateBookingDTO, BookingDTO>
{
  constructor(
    @Inject(BookRepository)
    private readonly repository: BookingRepositoryPort,

    @Inject(AreaRepository)
    private readonly areaRepository: AreaRepositoryPort,
  ) {}

  async run(bookingDTO: CreateBookingDTO): Promise<BookingDTO> {
    const bookingProps: BookingProps = {
      people: bookingDTO.people,
      day: new DateVO(bookingDTO.start),
      start: new Time(bookingDTO.start),
      end: new Time(bookingDTO.end),
      areaId: new ID(bookingDTO.areaId),
      clientId: new ID(bookingDTO.clientId),
      tableId: new ID(bookingDTO.tableId),
    };

    const booking = Booking.create(bookingProps);

    if (!booking.validateDate()) {
      throw new Error('The booking date is invalid');
    }

    const bookings = await this.repository.retrieveByDayAndAreaId(
      booking.getPropsCopy().day,
      booking.getPropsCopy().areaId,
    );
    // Check the availability of the area (AvailabilityService)
    // Check the area hoursPerReservation (Area)
    // Check open and close hours of the area (Area)
    // Check the interval of the area

    // Check the client

    const bookDomain = await this.repository.insert(booking);

    return BookingMapper.toDTO(bookDomain);
  }
}
