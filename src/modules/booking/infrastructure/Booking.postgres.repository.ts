import { ID, PaginationQueryParams, Paginated, DateTime } from '@common';
import { PrismaClient, Book as bookModel } from '@prisma/client';
import prisma from '@common/infrastructure/db';
import { BookingDTO, BookingMapper } from '../Booking.mapper';
import { BookingRepositoryPort, Booking } from '../domain';

export class BookingPostgresRepository implements BookingRepositoryPort {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  async retrieveByDateAndAreaId(
    date: DateTime,
    areaId: ID,
  ): Promise<Booking[]> {
    const booksDTO: BookingDTO[] = await this.prisma.book.findMany({
      where: {
        dateTime: date.value,
        areaId: areaId.value,
      },
    });

    const books = booksDTO.map((book) => BookingMapper.toDomain(book));

    return books;
  }

  async insert(entity: Booking): Promise<Booking> {
    const book: bookModel = BookingMapper.toDTO(entity);
    const bookCreated = await this.prisma.book.create({
      data: book,
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
