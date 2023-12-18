import { RepositoryPort, DateTime, ID } from '@common';
import { Book } from './Book.entity';

export interface BookRepositoryPort extends RepositoryPort<Book> {
  retrieveByDateAndAreaId(date: DateTime, areaId: ID): Promise<Book[]>;
}

export const BookRepository = Symbol('BookRepository');
