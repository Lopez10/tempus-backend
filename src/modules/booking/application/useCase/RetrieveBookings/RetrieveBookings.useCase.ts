import { UseCase } from '@common';
import { Inject, Injectable } from '@nestjs/common';
import { RetrieveBookingsDto as RetrieveBookingsDto } from './RetrieveBookings.dto';
import {
  BookingRepository,
  BookingRepositoryPort,
} from '@modules/booking/domain';
import { BookingMapper } from '@modules/booking/Booking.mapper';
import { BookingDto } from '@modules/booking';

@Injectable()
export class RetrieveBookingsUseCase
  implements UseCase<RetrieveBookingsDto, BookingDto[]>
{
  constructor(
    @Inject(BookingRepository)
    private readonly repository: BookingRepositoryPort,
  ) {}

  async run(retrieveBookingsDTO: RetrieveBookingsDto): Promise<BookingDto[]> {
    const { data } = await this.repository.findPaginationByCriteria(
      retrieveBookingsDTO.criteria,
      retrieveBookingsDTO.pagination,
    );

    const books = data.map(BookingMapper.toDto);

    return books;
  }
}
