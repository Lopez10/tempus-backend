import { Entity } from './entity.base';
import { ID } from './valueObject';
import { DomainEvent } from './event';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  private domainEvents: DomainEvent[];

  constructor(props: EntityProps, id?: ID) {
    super(props, id);
    this.domainEvents = [];
  }

  pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents;
    this.domainEvents = [];

    return domainEvents;
  }

  record(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }
}
