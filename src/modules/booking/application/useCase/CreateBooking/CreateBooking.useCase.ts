import { DateTime, UseCase } from '@common';
import {
  Booking,
  BookProps,
  BookRepository,
  BookingRepositoryPort,
} from '@modules/booking/domain';
import { Inject, Injectable } from '@nestjs/common';
import { CreateBookingDTO } from './CreateBookingDTO';
import { BookingDTO, BookingMapper } from '@modules/booking/Booking.mapper';

@Injectable()
export class CreateBookingUseCase
  implements UseCase<CreateBookingDTO, BookingDTO>
{
  constructor(
    @Inject(BookRepository)
    private readonly repository: BookingRepositoryPort,
  ) {}

  async run(bookDTO: CreateBookingDTO): Promise<BookingDTO> {
    const bookProps: BookProps = {
      people: bookDTO.people,
      dateTime: new DateTime(bookDTO.dateTime),
      areaId: bookDTO.areaId,
      clientId: bookDTO.clientId,
      tableId: bookDTO.tableId,
    };
    const book = Booking.create(bookProps);
    const bookDomain = await this.repository.insert(book);

    return BookingMapper.toDTO(bookDomain);
  }
}
