import { UseCase, DateTime, ID } from '@common';
import { Injectable, Inject } from '@nestjs/common';
import { RetrieveAvailableHoursOfDayDTO } from './RetrieveAvailableHoursOfDayDTO';
import { HoursAvailableDTO } from './HoursAvailableDTO';
import {
  AreaRepository,
  AreaRepositoryPort,
  BookRepository,
  BookingRepositoryPort,
  AvailabilityService,
} from '@modules';
import { AvailabilityMapper } from '@modules/shared/availability/Availability.mapper';

@Injectable()
export class RetrieveAvailableHoursOfDayUseCase
  implements UseCase<RetrieveAvailableHoursOfDayDTO, HoursAvailableDTO[]>
{
  constructor(
    @Inject(BookRepository)
    private readonly bookingRepository: BookingRepositoryPort,

    @Inject(AreaRepository)
    private readonly areaRepository: AreaRepositoryPort,

    private readonly availabilityService: AvailabilityService,
  ) {}

  async run(
    retrieveAvailableHoursOfDayDTO: RetrieveAvailableHoursOfDayDTO,
  ): Promise<HoursAvailableDTO[]> {
    const day = new DateTime(retrieveAvailableHoursOfDayDTO.day);
    const areaId = new ID(retrieveAvailableHoursOfDayDTO.areaId);
    const people = retrieveAvailableHoursOfDayDTO.people;

    const bookings = await this.bookingRepository.retrieveByDayAreaIdAndPeople(
      day,
      areaId,
      people,
    );

    const startAndPeopleOfBookings = bookings.map((booking) => ({
      start: booking.getPropsCopy().start,
      people: booking.getPropsCopy().people,
    }));

    const area = await this.areaRepository.findOneById(areaId);
    const maxCapacity = area.getPropsCopy().maxCapacity;

    const hoursAvailable = this.availabilityService.calculateAvailableHours(
      startAndPeopleOfBookings,
      maxCapacity,
    );

    const hoursAvailableDTO = hoursAvailable.map((availability) =>
      AvailabilityMapper.toDTO(availability),
    );

    return hoursAvailableDTO;
  }
}
