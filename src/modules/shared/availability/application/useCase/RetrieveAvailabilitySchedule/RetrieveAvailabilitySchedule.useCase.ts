import { UseCase, ID, DateVO } from '@common';
import { Injectable, Inject } from '@nestjs/common';
import { RetrieveAvailabilityScheduleDto } from './RetrieveAvailabilitySchedule.dto';
import { AvailabilityScheduleDto } from './AvailabilitySchedule.dto';
import {
  AreaRepository,
  AreaRepositoryPort,
  AvailabilityService,
  BookingRepository,
  BookingRepositoryPort,
  timeAndPeopleOfBooking,
} from '@modules';
import { AvailabilityMapper } from '@modules/shared/availability/Availability.mapper';

@Injectable()
export class RetrieveAvailableHoursOfDayUseCase
  implements
    UseCase<RetrieveAvailabilityScheduleDto, AvailabilityScheduleDto[]>
{
  private availabilityService: AvailabilityService = new AvailabilityService();
  constructor(
    @Inject(BookingRepository)
    private readonly bookingRepository: BookingRepositoryPort,

    @Inject(AreaRepository)
    private readonly areaRepository: AreaRepositoryPort,
  ) {}

  async run(
    retrieveAvailableHoursOfDayDTO: RetrieveAvailabilityScheduleDto,
  ): Promise<AvailabilityScheduleDto[]> {
    const day = new DateVO(retrieveAvailableHoursOfDayDTO.day);
    const areaId = new ID(retrieveAvailableHoursOfDayDTO.areaId);

    const bookings = await this.bookingRepository.retrieveByDayAndAreaId(
      day,
      areaId,
    );

    const timeAndPeopleOfBookings: timeAndPeopleOfBooking[] = bookings.map(
      (booking) => AvailabilityMapper.toTimeAndPeopleOfBookings(booking),
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
