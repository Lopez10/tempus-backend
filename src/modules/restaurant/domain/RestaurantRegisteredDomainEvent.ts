import { DomainEvent, ID } from '@common';

export class RestaurantRegisteredDomainEvent<T> extends DomainEvent {
  static eventName = 'restaurant.registered';
  constructor(props: T, id: ID) {
    super(RestaurantRegisteredDomainEvent.eventName);
  }
}
