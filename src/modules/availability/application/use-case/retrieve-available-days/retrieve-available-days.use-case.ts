import { DateVO, ID, UseCase } from '@common';
import { Inject, Injectable } from '@nestjs/common';
import { RetrieveAvailableDaysDto } from './retrieve-available-days.dto';
import { AvailableDaysDto } from './available-days.dto';
import {
	AreaRepository,
	AreaRepositoryPort,
	AvailabilityMapper,
	AvailabilityService,
	BookingRepository,
	BookingRepositoryPort,
} from '@modules';

@Injectable()
export class RetrieveAvailableDaysUseCase
	implements UseCase<RetrieveAvailableDaysDto, AvailableDaysDto>
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
	}: RetrieveAvailableDaysDto): Promise<AvailableDaysDto> {
		const today = new Date();
		const dateDomain = new DateVO(today);
		const restaurantIdDomain = new ID(restaurantId);

		const areas =
			await this.areaRepository.findByRestaurantId(restaurantIdDomain);

		const availableDays: string[] = [];

		for (const area of areas) {
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

			availableDays.push(...availabilityAreaDays);
		}

		const daysWithoutDuplicates = [...new Set(availableDays)];

		return {
			days: daysWithoutDuplicates,
		};
	}
}
