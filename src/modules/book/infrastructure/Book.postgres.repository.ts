import { ID, PaginationQueryParams, Paginated, DateTime } from '@common';
import { PrismaClient, Book as bookModel } from '@prisma/client';
import prisma from '@common/infrastructure/db';
import { BookDTO, BookMapper } from '../Book.mapper';
import { BookRepositoryPort, Book } from '../domain';

export class BookPostgresRepository implements BookRepositoryPort {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  async retrieveByDateAndAreaId(date: DateTime, areaId: ID): Promise<Book[]> {
    const booksDTO: BookDTO[] = await this.prisma.book.findMany({
      where: {
        dateTime: date.value,
        areaId: areaId.value,
      },
    });

    const books = booksDTO.map((book) => BookMapper.toDomain(book));

    return books;
  }

  async insert(entity: Book): Promise<Book> {
    const book: bookModel = BookMapper.toDTO(entity);
    const bookCreated = await this.prisma.book.create({
      data: book,
    });

    return BookMapper.toDomain(bookCreated);
  }

  insertSome(entity: Book[]): Promise<Book[]> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: ID): Promise<Book> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Book[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: ID): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findPaginationByCriteria(
    paginated: PaginationQueryParams,
    criteria?: any,
  ): Promise<Paginated<Book>> {
    throw new Error('Method not implemented.');
  }
  update(entity: Book): Promise<Book> {
    throw new Error('Method not implemented.');
  }
  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
