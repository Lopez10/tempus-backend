import { UseCase, ID, DateVO } from '@common';
import { Injectable, Inject } from '@nestjs/common';
import { RetrieveAvailableHoursOfDayDTO } from './RetrieveAvailableHoursOfDayDTO';
import { HoursAvailableDTO } from './HoursAvailableDTO';
import {
  AreaRepository,
  AreaRepositoryPort,
  AvailabilityService,
  BookRepository,
  BookingRepositoryPort,
  timeAndPeopleOfBookings,
} from '@modules';
import { AvailabilityMapper } from '@modules/shared/availability/Availability.mapper';

@Injectable()
export class RetrieveAvailableHoursOfDayUseCase
  implements UseCase<RetrieveAvailableHoursOfDayDTO, HoursAvailableDTO[]>
{
  private readonly availabilityService: AvailabilityService =
    new AvailabilityService();
  constructor(
    @Inject(BookRepository)
    private readonly bookingRepository: BookingRepositoryPort,

    @Inject(AreaRepository)
    private readonly areaRepository: AreaRepositoryPort,
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
    );

    const timeAndPeopleOfBookings: timeAndPeopleOfBookings[] = bookings.map(
      (booking) => ({
        start: booking.getPropsCopy().start,
        end: booking.getPropsCopy().end,
        people,
      }),
    );

    const area = await this.areaRepository.findOneById(areaId);

    const hoursAvailable = this.availabilityService.calculateAvailableHours({
      close: area.getPropsCopy().close,
      open: area.getPropsCopy().open,
      interval: area.getPropsCopy().interval,
      maxCapacity: area.getPropsCopy().maxCapacity,
      timeAndPeopleOfBookings,
    });

    const hoursAvailableDTO = hoursAvailable.map((availability) =>
      AvailabilityMapper.toDTO(availability),
    );

    return hoursAvailableDTO;
  }
}
