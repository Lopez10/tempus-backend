import { AggregateRoot, ID, Name, Time } from '@common';

export interface AreaProps {
  name: Name;
  maxCapacity: number;
  hoursPerReservation: number;
  open: Time;
  close: Time;
  interval: number;
  restaurantId: ID;
}

export interface AreaPrimitives {
  name: string;
  maxCapacity: number;
  hoursPerReservation: number;
  open: string;
  close: string;
  interval: number;
  restaurantId: string;
}

export class Area extends AggregateRoot<AreaProps> {
  private constructor(props: AreaProps, id?: ID) {
    super(props, id);
  }

  get hoursPerReservation(): number {
    return this.props.hoursPerReservation;
  }

  get interval(): number {
    return this.propsCopy.interval;
  }

  validateHours(start: Time, end: Time): boolean {
    const { open, close } = this.propsCopy;

    if (start.isBefore(open) || end.isAfter(close)) {
      return false;
    }

    return true;
  }

  validateHoursPerBooking(start: Time, end: Time): boolean {
    const { hoursPerReservation } = this.propsCopy;

    const duration = end.diffInHours(start);
    if (duration !== hoursPerReservation) {
      return false;
    }

    return true;
  }

  static create(props: AreaProps, id?: ID): Area {
    const isNewArea = !!id === false;

    const area = new Area(props, id);

    if (isNewArea) {
      // area.addDomainEvent(new AreaCreated(area));
    }

    return area;
  }
}
