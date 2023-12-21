import { DateTime, ID, UseCase } from '@common';
import {
  Booking,
  BookingProps,
  BookRepository,
  BookingRepositoryPort,
} from '@modules/booking/domain';
import { Inject, Injectable } from '@nestjs/common';
import { CreateBookingDTO } from './CreateBookingDTO';
import { BookingDTO, BookingMapper } from '@modules/booking/mappers/Booking.mapper';

@Injectable()
export class CreateBookingUseCase
  implements UseCase<CreateBookingDTO, BookingDTO>
{
  constructor(
    @Inject(BookRepository)
    private readonly repository: BookingRepositoryPort,
  ) {}

  async run(bookingDTO: CreateBookingDTO): Promise<BookingDTO> {
    const bookingProps: BookingProps = {
      people: bookingDTO.people,
      day: new DateTime(bookingDTO.start).createDayDate(),
      start: new DateTime(bookingDTO.start),
      end: new DateTime(bookingDTO.end),
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
    // Check if the start date solap with other booking the summary people is below the max capacity of the area

    const bookDomain = await this.repository.insert(booking);

    return BookingMapper.toDTO(bookDomain);
  }
}
