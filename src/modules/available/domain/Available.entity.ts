import { AggregateRoot, DateTime, ID } from '@common';
import { Area } from 'src/modules/area/domain/Area.entity';

export interface AvailableProps {
  areaId: ID;
  start: DateTime;
  finish: DateTime;
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

  calculateNewAvailableStart(start: DateTime): Available {
    throw new Error('Method not implemented.');
  }

  calculateNewAvailableFinish(finish: DateTime): Available {
    throw new Error('Method not implemented.');
  }

  calculateNewAvailable(available: number): Available {
    throw new Error('Method not implemented.');
  }

  recalculateOldAvailableStart(start: DateTime): Available {
    throw new Error('Method not implemented.');
  }

  recalculateOldAvailableFinish(finish: DateTime): Available {
    throw new Error('Method not implemented.');
  }

  recalculateOldAvailable(available: number): Available {
    throw new Error('Method not implemented.');
  }
}
