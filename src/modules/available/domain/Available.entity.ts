import { AggregateRoot, CustomDate, ID } from '@common';
import { Area } from 'src/modules/area/domain/Area.entity';

export interface AvailableProps {
  areaId: ID;
  date: CustomDate;
  available: number;
}

export class Available extends AggregateRoot<AvailableProps> {
  private constructor(props: AvailableProps, id?: ID) {
    super(props, id);
  }

  static create(props: AvailableProps, id?: ID): Available {
    return new Available(props, id);
  }

  getHoursPerReservationByArea(area: Area): number {
    return area.hoursPerReservation;
  }
}
