import { UseCase, DateTime, ID } from '@common';
import { BookRepository, BookingRepositoryPort } from '@modules/booking/domain';
import { Injectable, Inject } from '@nestjs/common';
import { RetrieveAvailableHoursOfDayDTO } from './RetrieveAvailableHoursOfDayDTO';
import { HoursAvailableDTO } from './HoursAvailableDTO';
import { AvailabilityService } from '@modules/booking/domain/services/Availability.service';
import { AvailabilityMapper } from '@modules/booking/mappers/Availability.mapper';

@Injectable()
export class RetrieveAvailableHoursOfDayUseCase
  implements UseCase<RetrieveAvailableHoursOfDayDTO, HoursAvailableDTO[]>
{
  constructor(
    @Inject(BookRepository)
    private readonly repository: BookingRepositoryPort,
    private readonly availabilityService: AvailabilityService,
  ) {}

  async run(
    retrieveAvailableHoursOfDayDTO: RetrieveAvailableHoursOfDayDTO,
  ): Promise<HoursAvailableDTO[]> {
    const day = new DateTime(retrieveAvailableHoursOfDayDTO.day);
    const areaId = new ID(retrieveAvailableHoursOfDayDTO.areaId);
    const people = retrieveAvailableHoursOfDayDTO.people;

    const bookings = await this.repository.retrieveByDayAreaIdAndPeople(
      day,
      areaId,
      people,
    );

    const hoursAvailable =
      this.availabilityService.calculateAvailableHours(bookings);

    const hoursAvailableDTO = hoursAvailable.map((availability) =>
      AvailabilityMapper.toDTO(availability),
    );

    return hoursAvailableDTO;
  }
}
