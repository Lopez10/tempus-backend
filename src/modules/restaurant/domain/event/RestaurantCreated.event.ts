import { DomainEvent, ID } from 'lib/common/src';

export class RestaurantCreated extends DomainEvent {
  static eventName = 'restaurant.created';
  constructor(public readonly id: ID, occurredOn?: Date) {
    super(RestaurantCreated.eventName, occurredOn);
  }
}
