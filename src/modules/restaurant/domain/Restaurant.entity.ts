import { AggregateRoot, Description, Email, ID, Name } from '@common';
import { RestaurantCreated } from './events/RestaurantCreated';

export interface RestaurantProps {
  name: Name;
  email: Email;
  description: Description;
}
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

  updateEmail(email: Email) {
    this.props.email = email;
  }
}
