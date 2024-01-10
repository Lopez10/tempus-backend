import { RepositoryPort, ID, DateVO } from '@common';
import { Booking } from './Booking.entity';

export interface BookingRepositoryPort extends RepositoryPort<Booking> {
  findByDayAndAreaId(day: DateVO, areaId: ID): Promise<Booking[]>;
}

export const BookingRepository = Symbol('BookRepository');
