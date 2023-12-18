import { DateTime, UseCase } from '@common';
import {
  Book,
  BookProps,
  BookRepository,
  BookRepositoryPort,
} from '@modules/book/domain';
import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDTO } from './CreateBookDTO';

@Injectable()
export class CreateBookUseCase implements UseCase<CreateBookDTO, Book> {
  constructor(
    @Inject(BookRepository)
    private readonly repository: BookRepositoryPort,
  ) {}

  async run(bookDTO: CreateBookDTO): Promise<Book> {
    const bookProps: BookProps = {
      people: bookDTO.people,
      dateTime: new DateTime(bookDTO.dateTime),
      areaId: bookDTO.areaId,
      clientId: bookDTO.clientId,
      tableId: bookDTO.tableId,
      serviceIds: bookDTO.serviceIds,
    };
    const book = Book.create(bookProps);
    await this.repository.insert(book);

    return book;
  }
}
