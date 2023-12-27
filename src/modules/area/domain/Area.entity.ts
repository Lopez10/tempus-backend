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

export class Area extends AggregateRoot<AreaProps> {
  private constructor(props: AreaProps, id?: ID) {
    super(props, id);
  }

  get hoursPerReservation(): number {
    return this.props.hoursPerReservation;
  }

  get interval(): number {
    return this.getPropsCopy().interval;
  }

  isInOpenHours(time: Time): boolean {
    return time.isBetween(this.props.open, this.props.close);
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
