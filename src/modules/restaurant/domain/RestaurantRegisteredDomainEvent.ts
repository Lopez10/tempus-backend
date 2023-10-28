import { DomainEvent, ID } from 'lib/common/src';

export class RestaurantRegisteredDomainEvent<T> extends DomainEvent {
  static eventName = 'restaurant.registered';
  constructor(props: T, id: ID) {
    super(RestaurantRegisteredDomainEvent.eventName);
  }
}
