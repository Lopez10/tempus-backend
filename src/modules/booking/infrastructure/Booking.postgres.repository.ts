import { ID, PaginationQueryParams, Paginated, DateVO } from '@common';
import { PrismaClient, Booking as bookModel } from '@prisma/client';
import prisma from '@common/infrastructure/db';
import { BookingMapper } from '../Booking.mapper';
import { BookingRepositoryPort, Booking } from '../domain';

export class BookingPostgresRepository implements BookingRepositoryPort {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  async retrieveByDayAndRestaurantId(day: DateVO, areaId: ID): Promise<Booking[]> {
    const bookings = await this.prisma.booking.findMany({
      where: {
        day: day.value,
        areaId: areaId.value,
      },
    });

    const bookingsDomain = bookings.map((book) => BookingMapper.toDomain(book));

    return bookingsDomain;
  }

  async insert(entity: Booking): Promise<Booking> {
    const booking: bookModel = BookingMapper.toDto(entity);
    const bookCreated = await this.prisma.booking.create({
      data: booking,
    });

    return BookingMapper.toDomain(bookCreated);
  }

  insertSome(entity: Booking[]): Promise<Booking[]> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: ID): Promise<Booking> {
    throw new Error('Method not implemented.');
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
}
