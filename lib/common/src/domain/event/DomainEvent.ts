import { ID } from '../valueObject';

export interface DomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): ID;
}
