import { DateVO, ID, UseCase } from '@common';
import { BookingDTO, BookingMapper } from '@modules/booking/Booking.mapper';
import { Inject, Injectable } from '@nestjs/common';
import { RetrieveBookingsByDayDTO } from './RetrieveBookingsByDayDTO';
import { BookRepository, BookingRepositoryPort } from '@modules/booking/domain';

@Injectable()
export class RetrieveBookingsByDayUseCase
  implements UseCase<RetrieveBookingsByDayDTO, BookingDTO[]>
{
  constructor(
    @Inject(BookRepository)
    private readonly repository: BookingRepositoryPort,
  ) {}

  async run(
    retrieveBookingsByDayDTO: RetrieveBookingsByDayDTO,
  ): Promise<BookingDTO[]> {
    const day = new DateVO(retrieveBookingsByDayDTO.day);
    const areaId = new ID(retrieveBookingsByDayDTO.areaId);

    const bookings = await this.repository.retrieveByDayAndAreaId(day, areaId);
    const books = bookings.map(BookingMapper.toDTO);

    return books;
  }
}
