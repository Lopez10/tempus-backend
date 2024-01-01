import { ID, UseCase } from '@common';
import { RetrieveBookingDTO } from './RetrieveBookingDTO';
import { BookingDTO, BookingMapper } from '@modules/booking/Booking.mapper';
import { Inject, Injectable } from '@nestjs/common';
import { BookingRepository, BookingRepositoryPort } from '@modules/booking/domain';

@Injectable()
export class RetrieveBookingUseCase
  implements UseCase<RetrieveBookingDTO, BookingDTO>
{
  constructor(
    @Inject(BookingRepository)
    private readonly bookPostgresRepository: BookingRepositoryPort,
  ) {}
  async run(retrieveBookDTO: RetrieveBookingDTO): Promise<BookingDTO | null> {
    try {
      const id = new ID(retrieveBookDTO.id);
      const book = await this.bookPostgresRepository.findOneById(id);

      if (!book) throw new Error('Book not found');

      return BookingMapper.toDTO(book);
    } catch (error) {
      throw new Error(error);
    }
  }
}
