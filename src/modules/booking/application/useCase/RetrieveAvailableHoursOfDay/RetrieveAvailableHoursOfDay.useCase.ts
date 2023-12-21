import { UseCase, DateTime, ID } from '@common';
import { BookingDTO, BookingMapper } from '@modules/booking/Booking.mapper';
import { BookRepository, BookingRepositoryPort } from '@modules/booking/domain';
import { Injectable, Inject } from '@nestjs/common';
import { RetrieveAvailableHoursOfDayDTO } from './RetrieveAvailableHoursOfDayDTO';

@Injectable()
export class RetrieveAvailableHoursOfDayUseCase
  implements UseCase<RetrieveAvailableHoursOfDayDTO, BookingDTO[]>
{
  constructor(
    @Inject(BookRepository)
    private readonly repository: BookingRepositoryPort,
  ) {}

  async run(
    retrieveAvailableHoursOfDayDTO: RetrieveAvailableHoursOfDayDTO,
  ): Promise<BookingDTO[]> {
    const day = new DateTime(retrieveAvailableHoursOfDayDTO.day);
    const areaId = new ID(retrieveAvailableHoursOfDayDTO.areaId);
    const people = retrieveAvailableHoursOfDayDTO.people;

    const bookings = await this.repository.retrieveByDayAreaIdAndPeople(
      day,
      areaId,
      people,
    );
    const books = bookings.map(BookingMapper.toDTO);

    return books;
  }
}
