import {
	Body,
	Controller,
	Get,
	Inject,
	Param,
	Post,
	Query,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
	CreateBookingDto,
	CreateBookingUseCase,
	RetrieveAvailabilityScheduleDto,
	RetrieveAvailableHoursOfDayUseCase,
	ResponseAvailabilityScheduleDto,
	RetrieveAvailableDaysUseCase,
} from '../application';
import { BookingDto, BookingPostgresRepository } from '@modules/booking';
import { AreaPostgresRepository } from '@modules/area';
import { AvailableDaysDto } from '../application/use-case/retrieve-available-days/available-days.dto';
import { RetrieveAvailableDaysDto } from '../application/use-case/retrieve-available-days/retrieve-available-days.dto';
import { ServiceDto } from '@modules/service/service.dto';

@ApiTags('availability')
@Controller('availability')
export class AvailabilityController {
	constructor(
		@Inject(BookingPostgresRepository)
		private readonly bookingPostgresRepository: BookingPostgresRepository,

		@Inject(AreaPostgresRepository)
		private readonly areaPostgresRepository: AreaPostgresRepository,
	) {}

	@Get('schedule')
	@ApiQuery({ name: 'restaurantId', example: 'fds12afd' })
	@ApiQuery({ name: 'day', example: '10/10/2021' })
	@ApiOkResponse({
		status: 200,
		description: 'The availability schedule has been successfully retrieved.',
		type: ResponseAvailabilityScheduleDto,
	})
	async retrieveSchedule(
		@Query('restaurantId') restaurantId: string,
		@Query('day') day: string,
	): Promise<ResponseAvailabilityScheduleDto> {
		const retrieveAvailability = new RetrieveAvailableHoursOfDayUseCase(
			this.bookingPostgresRepository,
			this.areaPostgresRepository,
		);
		const availabilityAreas = await retrieveAvailability.run({
			restaurantId,
			day,
		});

		const services: ServiceDto[] = [];

		const responseAvailabilityScheduleDto: ResponseAvailabilityScheduleDto = {
			availabilityAreas,
			services,
		};

		return responseAvailabilityScheduleDto;
	}

	@Get('days')
	@ApiOkResponse({
		status: 200,
		description: 'The available days has been successfully retrieved',
		type: AvailableDaysDto,
	})
	async retrieveAvailableDays(
		@Query('restaurantId') restaurantId: string,
	): Promise<AvailableDaysDto> {
		const retrieveAvailableDays = new RetrieveAvailableDaysUseCase(
			this.bookingPostgresRepository,
			this.areaPostgresRepository,
		);
		const availableDays = await retrieveAvailableDays.run(restaurantId);

		return availableDays;
	}

	@Post('new-booking')
	@ApiBody({
		type: CreateBookingDto,
	})
	@ApiOkResponse({
		status: 200,
		description: 'The booking has been successfully created.',
		type: [BookingDto],
	})
	async createBooking(
		@Body() createBookingDTO: CreateBookingDto,
	): Promise<BookingDto> {
		const createBooking = new CreateBookingUseCase(
			this.bookingPostgresRepository,
			this.areaPostgresRepository,
		);
		const bookingDto = await createBooking.run(createBookingDTO);

		return bookingDto;
	}
}
