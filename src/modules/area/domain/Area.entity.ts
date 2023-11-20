import { AggregateRoot, ID, Name } from '@common';

export interface AreaProps {
  name: Name;
  maxCapacity: number;
  hoursPerReservation: number;
  restaurantId: ID;
  books: ID[];
}

export class Area extends AggregateRoot<AreaProps> {
  private constructor(props: AreaProps, id?: ID) {
    super(props, id);
  }

  get hoursPerReservation(): number {
    return this.props.hoursPerReservation;
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
