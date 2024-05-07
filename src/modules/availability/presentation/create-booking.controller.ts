import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateBookingDto, CreateBookingUseCase } from '../application';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookingDto, BookingPostgresRepository } from '@modules/booking';
import { AreaPostgresRepository } from '@modules/area';

@ApiTags('new-booking')
@Controller('new-booking')
export class CreateBookingController {
	constructor(
		@Inject(BookingPostgresRepository)
		private readonly bookingPostgresRepository: BookingPostgresRepository,

		@Inject(AreaPostgresRepository)
		private readonly areaPostgresRepository: AreaPostgresRepository,
	) {}

	@Post()
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
