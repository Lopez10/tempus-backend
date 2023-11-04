export class DomainEvent {
  public readonly occurredOn: Date;

  constructor(public readonly eventName: string, occurredOn?: Date) {
    this.occurredOn = occurredOn ?? new Date();
  }
}
