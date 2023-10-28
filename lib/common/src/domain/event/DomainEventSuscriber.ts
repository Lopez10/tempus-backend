import { DomainEvent } from './DomainEvent.base';
import { DomainEventName } from './DomainEventName';

export interface DomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): DomainEventName<T>[];
  on(domainEvent: T): Promise<void>;
}
