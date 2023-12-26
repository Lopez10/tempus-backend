import { RepositoryPort, ID, DateVO } from '@common';
import { Booking } from './Booking.entity';

export interface BookingRepositoryPort extends RepositoryPort<Booking> {
  retrieveByDayAndAreaId(day: DateVO, areaId: ID): Promise<Booking[]>;
  retrieveByDayAreaIdAndPeople(
    day: DateVO,
    areaId: ID,
    // people: number,
  ): Promise<Booking[]>;
}

export const BookRepository = Symbol('BookRepository');
