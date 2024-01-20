import { DateVO, ID, UseCase } from '@common';
import { Inject, Injectable } from '@nestjs/common';
import { RetrieveAvailabilityCalendarDto } from './RetrieveAvailabilityCalendar.dto';
import { AvailableDaysDto } from './AvailableDays.dto';
import {
  AreaRepository,
  AreaRepositoryPort,
  AvailabilityMapper,
  AvailabilityService,
  BookingRepository,
  BookingRepositoryPort,
} from '@modules';

@Injectable()
export class RetrieveAvailabilityCalendarUseCase
  implements UseCase<RetrieveAvailabilityCalendarDto, AvailableDaysDto[]>
{
  private availabilityService: AvailabilityService = new AvailabilityService();

  constructor(
    @Inject(BookingRepository)
    private readonly bookingRepository: BookingRepositoryPort,

    @Inject(AreaRepository)
    private readonly areaRepository: AreaRepositoryPort,
  ) {}
  async run({
    restaurantId,
  }: RetrieveAvailabilityCalendarDto): Promise<AvailableDaysDto[]> {
    const today = new Date();
    const dateDomain = new DateVO(today);
    const restaurantIdDomain = new ID(restaurantId);

    const areas = await this.areaRepository.findByRestaurantId(
      restaurantIdDomain,
    );

    const availabilityCalendarByAreaDto = areas.map(async (area) => {
      // TODO: Fix this find by month
      const bookings = await this.bookingRepository.findByMonthAndAreaId(
        dateDomain,
        area.id,
      );

      const timeAndPeopleOfBookings = bookings.map((booking) =>
        AvailabilityMapper.toTimeAndPeopleOfBookings(booking),
      );

      const availabilityAreaDays =
        this.availabilityService.calculateAvailableDays({
          timeAndPeopleOfBookings,
          date: dateDomain,
          open: area.propsCopy.open,
          close: area.propsCopy.close,
          interval: area.propsCopy.interval,
          maxCapacity: area.propsCopy.maxCapacity,
        });

      return availabilityAreaDays.map((availabilityAreaDay) =>
        AvailabilityMapper.toCalendarDto(availabilityAreaDay),
      );
    });

    const availabilityCalendarByArea = await Promise.all(
      availabilityCalendarByAreaDto,
    );

    return availabilityCalendarByArea.flat();
  }
}
