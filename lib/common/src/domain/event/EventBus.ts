import { DomainEvent } from './DomainEvent.base';

export interface EventBus {
  publish(event: DomainEvent[]): Promise<void>;
}
