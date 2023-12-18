import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookPostgresRepository } from '../infrastructure';
import {
  CreateBookDTO,
  CreateBookUseCase,
  RetrieveBookDTO,
  RetrieveBookUseCase,
  RetrieveBooksDTO,
  RetrieveBooksUseCase,
} from '../application';
import { BookDTO } from '../Book.mapper';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(
    @Inject(BookPostgresRepository)
    private readonly bookPostgresRepository: BookPostgresRepository,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully retrieved.',
    type: Promise<BookDTO>,
  })
  async retrieveBook(
    @Body() retrieveBookDTO: RetrieveBookDTO,
  ): Promise<BookDTO> {
    const retrieveBook = new RetrieveBookUseCase(this.bookPostgresRepository);
    const bookDTO = retrieveBook.run(retrieveBookDTO);

    return bookDTO;
  }

  @Get('multiple')
  async retrieveMultipleBook(
    @Body() RetrieveBooksDTO: RetrieveBooksDTO,
  ): Promise<BookDTO[]> {
    const retrieveBooks = new RetrieveBooksUseCase(this.bookPostgresRepository);
    const booksDTO = retrieveBooks.run(RetrieveBooksDTO);

    return booksDTO;
  }

  @Post()
  async createBook(@Body() createBookDTO: CreateBookDTO): Promise<BookDTO> {
    const createBook = new CreateBookUseCase(this.bookPostgresRepository);
    const bookCreated = createBook.run(createBookDTO);

    return bookCreated;
  }
}
