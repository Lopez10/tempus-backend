import { AggregateRoot, Description, ID, Name } from '@common';
import { RestaurantRegisteredDomainEvent } from './RestaurantRegisteredDomainEvent';

type restaurantProps = {
  name: Name;
  description: Description;
};

type restaurantPrimitives = {
  id: string;
  name: string;
  description: string;
};

export class Restaurant extends AggregateRoot<restaurantProps> {
  constructor(props: restaurantProps, id?: ID) {
    super(props, id);
  }

  static create(props: restaurantProps, id?: ID): Restaurant {
    const restaurant = new Restaurant(props, id);

    restaurant.record(
      new RestaurantRegisteredDomainEvent<restaurantProps>(props, id),
    );

    return restaurant;
  }

  static fromPrimitives(primitives: restaurantPrimitives) {
    return new Restaurant(
      {
        name: new Name(primitives.name),
        description: new Description(primitives.description),
      },
      new ID(primitives.id),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.props.name.value,
      description: this.props.description.value,
    };
  }
}
