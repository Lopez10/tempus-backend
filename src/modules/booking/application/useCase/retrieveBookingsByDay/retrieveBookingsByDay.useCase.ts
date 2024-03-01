import { DateVO, ID, UseCase } from '@common';
import { BookingMapper } from '@modules/booking/booking.mapper';
import { Inject, Injectable } from '@nestjs/common';
import { RetrieveBookingsByDayDto } from './retrieveBookingsByDayDto';
import {
	BookingRepository,
	BookingRepositoryPort,
} from '@modules/booking/domain';
import { BookingDto } from '@modules/booking';

@Injectable()
export class RetrieveBookingsByDayUseCase
	implements UseCase<RetrieveBookingsByDayDto, BookingDto[]>
{
	constructor(
		@Inject(BookingRepository)
		private readonly repository: BookingRepositoryPort,
	) {}

	async run(
		retrieveBookingsByDayDto: RetrieveBookingsByDayDto,
	): Promise<BookingDto[]> {
		const day = new DateVO(retrieveBookingsByDayDto.day);
		const areaId = new ID(retrieveBookingsByDayDto.areaId);

		const bookings = await this.repository.findByDayAndAreaId(day, areaId);
		const bookingsDomain = bookings.map(BookingMapper.toDto);

		return bookingsDomain;
	}
}
