import { Body, Controller, Get, Inject } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingPostgresRepository } from '../infrastructure';
import {
	RetrieveBookingDto,
	RetrieveBookingUseCase,
	RetrieveBookingsDto,
	RetrieveBookingsUseCase,
} from '../application';
import { BookingDto } from '../booking.dto';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
	constructor(
		@Inject(BookingPostgresRepository)
		private readonly bookPostgresRepository: BookingPostgresRepository,
	) {}

	@Get()
	@ApiResponse({
		status: 200,
		description: 'The book has been successfully retrieved.',
		type: BookingDto,
	})
	async retrieveBook(
		@Body() retrieveBookDTO: RetrieveBookingDto,
	): Promise<BookingDto> {
		const retrieveBook = new RetrieveBookingUseCase(
			this.bookPostgresRepository,
		);
		const bookDTO = retrieveBook.run(retrieveBookDTO);

		return bookDTO;
	}

	@Get('multiple')
	async retrieveMultipleBook(
		@Body() RetrieveBooksDTO: RetrieveBookingsDto,
	): Promise<BookingDto[]> {
		const retrieveBooks = new RetrieveBookingsUseCase(
			this.bookPostgresRepository,
		);
		const booksDTO = retrieveBooks.run(RetrieveBooksDTO);

		return booksDTO;
	}
}
