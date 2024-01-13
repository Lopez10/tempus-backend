import { UseCase, ID, DateVO } from '@common';
import { Injectable, Inject } from '@nestjs/common';
import {
  BookingRepository,
  BookingRepositoryPort,
  timeAndPeopleOfBooking,
} from '@modules/booking';
import { AreaRepository, AreaRepositoryPort } from '@modules/area';
import {
  AvailabilityService,
  AvailabilityMapper,
  AvailabilityAreasDto,
  RetrieveAvailabilityScheduleDto,
} from '@modules/shared/availability';

@Injectable()
export class RetrieveAvailableHoursOfDayUseCase
  implements UseCase<RetrieveAvailabilityScheduleDto, AvailabilityAreasDto[]>
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
  ): Promise<AvailabilityAreasDto[]> {
    const day = new DateVO(retrieveAvailableHoursOfDayDTO.day);
    const restaurantId = new ID(retrieveAvailableHoursOfDayDTO.restaurantId);

    const areas = await this.areaRepository.findByRestaurantId(restaurantId);

    const responseHoursAvailableByAreaDto: AvailabilityAreasDto[] = [];

    areas.forEach(async (area) => {
      const bookings = await this.bookingRepository.findByDayAndAreaId(
        day,
        area.id,
      );

      const timeAndPeopleOfBookings: timeAndPeopleOfBooking[] = bookings.map(
        (booking) => AvailabilityMapper.toTimeAndPeopleOfBookings(booking),
      );

      const hoursAvailable = this.availabilityService.calculateAvailableHours({
        close: area.getPropsCopy().close,
        open: area.getPropsCopy().open,
        interval: area.getPropsCopy().interval,
        maxCapacity: area.getPropsCopy().maxCapacity,
        timeAndPeopleOfBookings,
      });

      const availability = hoursAvailable.map((availability) =>
        AvailabilityMapper.toDTO(availability),
      );

      const hoursAvailableByAreaDto: AvailabilityAreasDto = {
        areaId: area.id.value,
        availability,
      };

      responseHoursAvailableByAreaDto.push(hoursAvailableByAreaDto);
    });

    return responseHoursAvailableByAreaDto;
  }
}
