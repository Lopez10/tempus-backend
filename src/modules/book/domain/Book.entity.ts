import { AggregateRoot, DateTime, ID } from '@common';

export interface BookProps {
  people: number;
  dateTime: DateTime;
  areaId: string;
  clientId: string;
  tableId: string;
  serviceIds: string[];
}

export class Book extends AggregateRoot<BookProps> {
  private constructor(props: BookProps, id?: ID) {
    super(props, id);
  }

  static create(props: BookProps, id?: ID): Book {
    const book = new Book(props, id);

    return book;
  }
}
