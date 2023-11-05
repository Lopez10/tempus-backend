import { AggregateRoot, Description, Email, ID, Name } from '@common';
import { RestaurantCreated } from './events/RestaurantCreated';

export type RestaurantProps = {
  name: Name;
  email: Email;
  description: Description;
};

type restaurantPrimitives = {
  id: string;
  name: string;
  email: string;
  description: string;
};

export class Restaurant extends AggregateRoot<RestaurantProps> {
  private constructor(props: RestaurantProps, id?: ID) {
    super(props, id);
  }

  static create(props: RestaurantProps, id?: ID): Restaurant {
    const isNewRestaurant = !!id === false;

    const restaurant = new Restaurant(props, id);

    if (isNewRestaurant) {
      restaurant.addDomainEvent(new RestaurantCreated(restaurant));
    }

    return restaurant;
  }

  static fromPrimitives(primitives: restaurantPrimitives) {
    return new Restaurant(
      {
        name: new Name(primitives.name),
        email: new Email(primitives.email),
        description: new Description(primitives.description),
      },
      new ID(primitives.id),
    );
  }

  toPrimitives() {
    return {
      id: this._id.value,
      name: this.props.name.value,
      email: this.props.email.value,
      description: this.props.description.value,
    };
  }

  updateEmail(email: Email) {
    this.props.email = email;
  }
}
