import { RepositoryPort, DateTime, ID } from '@common';
import { Booking } from './Booking.entity';

export interface BookingRepositoryPort extends RepositoryPort<Booking> {
  retrieveByDateAndAreaId(date: DateTime, areaId: ID): Promise<Booking[]>;
}

export const BookRepository = Symbol('BookRepository');
