import { AggregateRoot, ID, Name } from '@common';

export interface AvailableProps {
  name: Name;
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
