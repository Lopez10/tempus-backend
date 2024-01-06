import { ID, UseCase } from '@common';
import { RetrieveBookingDto } from './RetrieveBooking.dto';
import { BookingDto, BookingMapper } from '@modules/booking/Booking.mapper';
import { Inject, Injectable } from '@nestjs/common';
import {
  BookingRepository,
  BookingRepositoryPort,
} from '@modules/booking/domain';

@Injectable()
export class RetrieveBookingUseCase
  implements UseCase<RetrieveBookingDto, BookingDto>
{
  constructor(
    @Inject(BookingRepository)
    private readonly bookPostgresRepository: BookingRepositoryPort,
  ) {}
  async run(retrieveBookDTO: RetrieveBookingDto): Promise<BookingDto | null> {
    try {
      const id = new ID(retrieveBookDTO.id);
      const book = await this.bookPostgresRepository.findOneById(id);

      if (!book) throw new Error('Book not found');

      return BookingMapper.toDto(book);
    } catch (error) {
      throw new Error(error);
    }
  }
}
