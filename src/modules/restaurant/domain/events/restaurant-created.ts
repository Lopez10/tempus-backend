import { DomainEvent } from '@common/domain/event/DomainEvent';
import { Restaurant } from '../restaurant.aggregate-root';
import { ID } from '@common';

export class RestaurantCreated implements DomainEvent {
	dateTimeOccurred: Date;
	restaurant: Restaurant;

	constructor(restaurant: Restaurant) {
		this.dateTimeOccurred = new Date();
		this.restaurant = restaurant;
	}

	getAggregateId(): ID {
		return this.restaurant.id;
	}
}
