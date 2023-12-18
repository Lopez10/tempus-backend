import { Name, ID, PaginationQueryParams, Paginated } from '@common';
import { PrismaClient, Book as bookModel } from '@prisma/client';
import prisma from '@common/infrastructure/db';
import { Book, BookRepositoryPort } from '../domain';
import { BookMapper } from '../Book.mapper';

export class BookPostgresRepository implements BookRepositoryPort {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  findByBookName(name: Name): Promise<Book> {
    throw new Error('Method not implemented.');
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
