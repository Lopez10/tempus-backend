import { DateTime, ID } from '@common';
import { Booking } from './domain';

export interface BookingDTO {
  id: string;
  people: number;
  dateTime: Date;
  areaId: string;
  clientId: string;
  tableId: string;
}

export class BookingMapper {
  static toDomain(bookDTO: BookingDTO): Booking {
    return Booking.create(
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
  static toDTO(book: Booking): BookingDTO {
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
