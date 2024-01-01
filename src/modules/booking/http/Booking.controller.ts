import { Body, Controller, Get, Inject } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingPostgresRepository } from '../infrastructure';
import {
  RetrieveBookingDTO,
  RetrieveBookingUseCase,
  RetrieveBookingsDTO,
  RetrieveBookingsUseCase,
} from '../application';
import { BookingDTO } from '../Booking.mapper';

@ApiTags('book')
@Controller('book')
export class BookingController {
  constructor(
    @Inject(BookingPostgresRepository)
    private readonly bookPostgresRepository: BookingPostgresRepository,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully retrieved.',
    type: Promise<BookingDTO>,
  })
  async retrieveBook(
    @Body() retrieveBookDTO: RetrieveBookingDTO,
  ): Promise<BookingDTO> {
    const retrieveBook = new RetrieveBookingUseCase(
      this.bookPostgresRepository,
    );
    const bookDTO = retrieveBook.run(retrieveBookDTO);

    return bookDTO;
  }

  @Get('multiple')
  async retrieveMultipleBook(
    @Body() RetrieveBooksDTO: RetrieveBookingsDTO,
  ): Promise<BookingDTO[]> {
    const retrieveBooks = new RetrieveBookingsUseCase(
      this.bookPostgresRepository,
    );
    const booksDTO = retrieveBooks.run(RetrieveBooksDTO);

    return booksDTO;
  }
}
