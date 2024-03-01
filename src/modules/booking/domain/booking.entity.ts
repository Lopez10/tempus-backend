import { AggregateRoot, DateVO, ID, Time } from '@common';

export interface BookingProps {
  people: number;
  day: DateVO;
  start: Time;
  end: Time;
  areaId: ID;
  clientId: ID;
  tableId: ID;
}

export class Booking extends AggregateRoot<BookingProps> {
  private constructor(props: BookingProps, id?: ID) {
    super(props, id);
  }

  static create(props: BookingProps, id?: ID): Booking {
    const book = new Booking(props, id);

    return book;
  }

  get people(): number {
    return this.propsCopy.people;
  }

  validateDate(): boolean {
    return this.propsCopy.start.isBefore(this.propsCopy.end);
  }
}
