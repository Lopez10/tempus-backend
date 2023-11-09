import { DomainEvent, ID } from '@common';
import { Area } from '../Area.entity';

export class AreaCreated implements DomainEvent {
  dateTimeOccurred: Date;
  area: Area;

  constructor(area: Area) {
    this.dateTimeOccurred = new Date();
    this.area = area;
  }

  getAggregateId(): ID {
    return this.area.id;
  }
}
