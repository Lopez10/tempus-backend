import { Name, ID, PaginationQueryParams, Paginated } from '@common';
import { Book, BookRepositoryPort } from '../domain';

export class BookPostgresRepository implements BookRepositoryPort {
  findByBookName(name: Name): Promise<Book> {
    throw new Error('Method not implemented.');
  }
  insert(entity: Book): Promise<Book> {
    throw new Error('Method not implemented.');
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
