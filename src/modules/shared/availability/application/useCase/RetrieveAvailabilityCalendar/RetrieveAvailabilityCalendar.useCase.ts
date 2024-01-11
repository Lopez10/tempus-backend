import { DateVO, ID, UseCase } from '@common';
import { Inject, Injectable } from '@nestjs/common';
import { RetrieveAvailabilityCalendarDto } from './RetrieveAvailabilityCalendar.dto';
import { AvailabilityCalendarDto } from './AvailabilityCalendar.dto';
import {
  AreaRepository,
  AreaRepositoryPort,
  AvailabilityService,
  BookingRepository,
  BookingRepositoryPort,
} from '@modules';

@Injectable()
export class RetrieveAvailabilityCalendarUseCase
  implements
    UseCase<RetrieveAvailabilityCalendarDto, AvailabilityCalendarDto[]>
{
  private availabilityService: AvailabilityService = new AvailabilityService();

  constructor(
    @Inject(BookingRepository)
    private readonly bookingRepository: BookingRepositoryPort,

    @Inject(AreaRepository)
    private readonly areaRepository: AreaRepositoryPort,
  ) {}
  async run({
    date,
    restaurantId,
  }: RetrieveAvailabilityCalendarDto): Promise<AvailabilityCalendarDto[]> {
    const dateDomain = new DateVO(date);
    const restaurantIdDomain = new ID(restaurantId);

    const areas = await this.areaRepository.findByRestaurantId(
      restaurantIdDomain,
    );

    const availabilityCalendarDto: AvailabilityCalendarDto[] = [];

    areas.forEach(async (area) => {
      const bookings = await this.bookingRepository.findByDayAndAreaId(
        dateDomain,
        area.id,
      );

      // Calculate available days of month in availabilityService
    });

    return;
  }
}
