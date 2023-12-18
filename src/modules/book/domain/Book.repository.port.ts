import { RepositoryPort, Name } from '@common';
import { Book } from './Book.entity';

export interface BookRepositoryPort extends RepositoryPort<Book> {
  findByBookName(name: Name): Promise<Book | null>;
}

export const BookRepository = Symbol('BookRepository');
