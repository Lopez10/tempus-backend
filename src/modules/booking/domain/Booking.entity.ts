import { AggregateRoot, DateTime, ID } from '@common';

export interface BookProps {
  people: number;
  dateTime: DateTime;
  areaId: string;
  clientId: string;
  tableId: string;
}

export class Booking extends AggregateRoot<BookProps> {
  private constructor(props: BookProps, id?: ID) {
    super(props, id);
  }

  static create(props: BookProps, id?: ID): Booking {
    const book = new Booking(props, id);

    return book;
  }
}
