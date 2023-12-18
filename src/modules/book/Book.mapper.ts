import { DateTime, ID } from '@common';
import { Book } from './domain';

export interface BookDTO {
  id: string;
  people: number;
  dateTime: Date;
  areaId: string;
  clientId: string;
  tableId: string;
}

export class BookMapper {
  static toDomain(bookDTO: BookDTO): Book {
    return Book.create(
      {
        people: bookDTO.people,
        dateTime: new DateTime(bookDTO.dateTime),
        areaId: bookDTO.areaId,
        clientId: bookDTO.clientId,
        tableId: bookDTO.tableId,
      },
      new ID(bookDTO.id),
    );
  }
  static toDTO(book: Book): BookDTO {
    return {
      id: book.getPropsCopy().id.value,
      people: book.getPropsCopy().people,
      dateTime: book.getPropsCopy().dateTime.value,
      areaId: book.getPropsCopy().areaId,
      clientId: book.getPropsCopy().clientId,
      tableId: book.getPropsCopy().tableId,
    };
  }
}
