import { DomainEvent, ID } from 'lib/common/src';

export class RestaurantCreated<T> extends DomainEvent {
  static eventName = 'restaurant.created';
  constructor(public readonly props: T, public readonly id: ID) {
    super(RestaurantCreated.eventName);
  }
}
