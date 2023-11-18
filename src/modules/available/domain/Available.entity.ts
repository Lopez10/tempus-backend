import { AggregateRoot, ID } from '@common';
import { DateTime } from '@common/domain/valueObject/valueObjects/DateTime.valueObject';

export interface AvailableProps {
  date: DateTime;
  areaId: ID;
  available: number;
}

export class Available extends AggregateRoot<AvailableProps> {
  private constructor(props: AvailableProps, id?: ID) {
    super(props, id);
  }

  static create(props: AvailableProps, id?: ID): Available {
    return new Available(props, id);
  }
}
