import { RepositoryPort, ID, DateVO } from '@common';
import { Booking } from './booking.entity';

export interface BookingRepositoryPort extends RepositoryPort<Booking> {
	findByDayAndAreaId(day: DateVO, areaId: ID): Promise<Booking[]>;
	findByMonthAndAreaId(month: DateVO, areaId: ID): Promise<Booking[]>;
}

export const BookingRepository = Symbol('BookRepository');
