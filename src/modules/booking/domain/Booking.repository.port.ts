import { RepositoryPort, DateTime, ID } from '@common';
import { Booking } from './Booking.entity';

export interface BookingRepositoryPort extends RepositoryPort<Booking> {
  retrieveByDayAndAreaId(day: DateTime, areaId: ID): Promise<Booking[]>;
}

export const BookRepository = Symbol('BookRepository');
