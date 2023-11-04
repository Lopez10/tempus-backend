import { DomainEvent, Email, ID } from '@common';

export class RestaurantEmailUpdated extends DomainEvent {
  static eventName = 'restaurant.email.updated';
  constructor(
    public readonly restaurantId: ID,
    public readonly email: Email,
    occuredOn?: Date,
  ) {
    super(RestaurantEmailUpdated.eventName, occuredOn);
  }
}
