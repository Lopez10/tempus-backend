import { UseCase } from '@common';
import { Inject, Injectable } from '@nestjs/common';
import { RetrieveBookingsDTO as RetrieveBookingsDTO } from './RetrieveBookingsDTO';
import { BookRepository, BookingRepositoryPort } from '@modules/booking/domain';
import { BookingDTO, BookingMapper } from '@modules/booking/Booking.mapper';

@Injectable()
export class RetrieveBookingsUseCase
  implements UseCase<RetrieveBookingsDTO, BookingDTO[]>
{
  constructor(
    @Inject(BookRepository)
    private readonly repository: BookingRepositoryPort,
  ) {}

  async run(retrieveBookingsDTO: RetrieveBookingsDTO): Promise<BookingDTO[]> {
    const { data } = await this.repository.findPaginationByCriteria(
      retrieveBookingsDTO.criteria,
      retrieveBookingsDTO.pagination,
    );

    const books = data.map(BookingMapper.toDTO);

    return books;
  }
}
