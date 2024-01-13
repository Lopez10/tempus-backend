import { DateVO, ID, PaginationQueryParams, Paginated } from '@common';
import {
  Booking,
  BookingDto,
  BookingMapper,
  BookingRepositoryPort,
} from '@modules';

export class MockBookingRepository implements BookingRepositoryPort {
  private bookingsDTO: BookingDto[] = [];

  findByMonthAndAreaId(month: DateVO, areaId: ID): Promise<Booking[]> {
    throw new Error('Method not implemented.');
  }
  findByDayAndAreaId(day: DateVO, areaId: ID): Promise<Booking[]> {
    const bookings = this.bookingsDTO.filter(
      (booking) => booking.day === day.value && booking.areaId === areaId.value,
    );
    const bookingsDomain = bookings.map((booking) =>
      BookingMapper.toDomain(booking),
    );

    return Promise.resolve(bookingsDomain);
  }

  insert(entity: Booking): Promise<Booking> {
    const bookingDTO = BookingMapper.toDto(entity);
    this.bookingsDTO.push(bookingDTO);

    return Promise.resolve(entity);
  }

  insertSome(entities: Booking[]): Promise<Booking[]> {
    const bookingsDTO = entities.map((entity) => BookingMapper.toDto(entity));
    bookingsDTO.forEach((bookingDTO) => {
      this.bookingsDTO.push(bookingDTO);
    });
    return Promise.resolve(entities);
  }

  findOneById(id: ID): Promise<Booking> {
    const booking = this.bookingsDTO.find((booking) => booking.id === id.value);
    const bookingDomain = BookingMapper.toDomain(booking);

    return Promise.resolve(bookingDomain);
  }
  findAll(): Promise<Booking[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: ID): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findPaginationByCriteria(
    paginated: PaginationQueryParams,
    criteria?: any,
  ): Promise<Paginated<Booking>> {
    throw new Error('Method not implemented.');
  }
  update(entity: Booking): Promise<Booking> {
    throw new Error('Method not implemented.');
  }
  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }

  clear() {
    this.bookingsDTO = [];
  }
}
