import { AggregateRoot, DateTime, ID } from '@common';

export interface BookProps {
  people: number;
  day: DateTime;
  start: DateTime;
  end: DateTime;
  areaId: ID;
  clientId: ID;
  tableId: ID;
}

export class Booking extends AggregateRoot<BookProps> {
  private constructor(props: BookProps, id?: ID) {
    super(props, id);
  }

  static create(props: BookProps, id?: ID): Booking {
    const book = new Booking(props, id);

    return book;
  }

  get people(): number {
    return this.getPropsCopy().people;
  }

  validateDate(): boolean {
    return this.getPropsCopy().start.isBefore(this.getPropsCopy().end);
  }
}
