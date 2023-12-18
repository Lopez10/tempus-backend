import { DateTime, UseCase } from '@common';
import {
  Book,
  BookProps,
  BookRepository,
  BookRepositoryPort,
} from '@modules/book/domain';
import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDTO } from './CreateBookDTO';
import { BookDTO, BookMapper } from '@modules/book/Book.mapper';

@Injectable()
export class CreateBookUseCase implements UseCase<CreateBookDTO, BookDTO> {
  constructor(
    @Inject(BookRepository)
    private readonly repository: BookRepositoryPort,
  ) {}

  async run(bookDTO: CreateBookDTO): Promise<BookDTO> {
    const bookProps: BookProps = {
      people: bookDTO.people,
      dateTime: new DateTime(bookDTO.dateTime),
      areaId: bookDTO.areaId,
      clientId: bookDTO.clientId,
      tableId: bookDTO.tableId,
    };
    const book = Book.create(bookProps);
    const bookDomain = await this.repository.insert(book);

    return BookMapper.toDTO(bookDomain);
  }
}
