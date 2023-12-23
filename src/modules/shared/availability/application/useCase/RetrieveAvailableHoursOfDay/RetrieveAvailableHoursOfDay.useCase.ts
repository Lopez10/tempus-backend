import { UseCase, ID, DateVO } from '@common';
import { Injectable, Inject } from '@nestjs/common';
import { RetrieveAvailableHoursOfDayDTO } from './RetrieveAvailableHoursOfDayDTO';
import { HoursAvailableDTO } from './HoursAvailableDTO';
import {
  AreaRepository,
  AreaRepositoryPort,
  BookRepository,
  BookingRepositoryPort,
  AvailabilityService,
  timeAndPeopleOfBookings,
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
    const day = new DateVO(retrieveAvailableHoursOfDayDTO.day);
    const areaId = new ID(retrieveAvailableHoursOfDayDTO.areaId);
    const people = retrieveAvailableHoursOfDayDTO.people;

    const bookings = await this.bookingRepository.retrieveByDayAreaIdAndPeople(
      day,
      areaId,
      people,
    );

    const timeAndPeopleOfBookings: timeAndPeopleOfBookings[] = bookings.map(
      (booking) => ({
        start: booking.getPropsCopy().start,
        end: booking.getPropsCopy().end,
        people: booking.getPropsCopy().people,
      }),
    );

    const area = await this.areaRepository.findOneById(areaId);

    const hoursAvailable = this.availabilityService.calculateAvailableHours({
      endTime: area.getPropsCopy().close,
      startTime: area.getPropsCopy().open,
      interval: area.getPropsCopy().interval,
      maxCapacity: area.getPropsCopy().maxCapacity,
      timeAndPeopleOfBookings,
    });

    const hoursAvailableDTO = hoursAvailable.map((availability) =>
      AvailabilityMapper.toDTO(availability),
    );

    return [];
  }
}
