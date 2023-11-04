import { Entity } from './entity.base';
import { ID } from './valueObject';
import { DomainEvent } from './event';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  private _domainEvents: DomainEvent[];

  constructor(props: EntityProps, id?: ID) {
    super(props, id);
    this._domainEvents = [];
  }

  pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents;
    this.clearEvents();

    return domainEvents;
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  record(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
