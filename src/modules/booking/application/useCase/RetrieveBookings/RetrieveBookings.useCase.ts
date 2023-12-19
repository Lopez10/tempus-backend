import { UseCase } from '@common';
import { Inject, Injectable } from '@nestjs/common';
import { RetrieveBookingsDTO as RetrieveBooks } from './RetrieveBookingsDTO';
import { BookRepository, BookingRepositoryPort } from '@modules/booking/domain';
import { BookingDTO, BookingMapper } from '@modules/booking/Booking.mapper';

@Injectable()
export class RetrieveBookingsUseCase
  implements UseCase<RetrieveBooks, BookingDTO[]>
{
  constructor(
    @Inject(BookRepository)
    private readonly repository: BookingRepositoryPort,
  ) {}

  async run(bookDTO: RetrieveBooks): Promise<BookingDTO[]> {
    const { data } = await this.repository.findPaginationByCriteria(
      bookDTO.criteria,
      bookDTO.pagination,
    );

    const books = data.map(BookingMapper.toDTO);

    return books;
  }
}
