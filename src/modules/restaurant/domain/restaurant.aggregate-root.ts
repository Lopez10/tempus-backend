import { AggregateRoot, Description, Email, ID, Name } from '@common';
import { RestaurantCreated } from './events/restaurant-created';

export interface RestaurantProps {
	name: Name;
	email: Email;
	description: Description;
	capacity: number;
}
export class Restaurant extends AggregateRoot<RestaurantProps> {
	private constructor(props: RestaurantProps, id?: ID) {
		super(props, id);
	}

	updateCapacity(newCapacity: number): void {
		this.props.capacity = newCapacity;
	}

	static create(props: RestaurantProps, id?: ID): Restaurant {
		const isNewRestaurant = !!id === false;

		const restaurant = new Restaurant(props, id);

		if (isNewRestaurant) {
			restaurant.addDomainEvent(new RestaurantCreated(restaurant));
		}

		return restaurant;
	}
}
