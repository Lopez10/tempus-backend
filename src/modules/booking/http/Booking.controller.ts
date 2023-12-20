import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingPostgresRepository } from '../infrastructure';
import {
  CreateBookingDTO,
  CreateBookingUseCase,
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

  @Post()
  async createBook(@Body() createBookDTO: CreateBookingDTO): Promise<BookingDTO> {
    const createBook = new CreateBookingUseCase(this.bookPostgresRepository);
    const bookCreated = createBook.run(createBookDTO);

    return bookCreated;
  }
}
