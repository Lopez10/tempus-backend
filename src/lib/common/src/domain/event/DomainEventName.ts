import { DomainEvent } from './DomainEvent.base';

export type DomainEventName<T extends DomainEvent> = Pick<T, 'eventName'>;
