import { Module } from '@nestjs/common';
import { BookController } from './http';
import { BookPostgresRepository } from './infrastructure';
import {
  CreateBookUseCase,
  RetrieveBookUseCase,
  RetrieveBooksUseCase,
} from './application';
import { BookRepository } from './domain';

@Module({
  controllers: [BookController],
  providers: [
    BookController,
    BookPostgresRepository,
    {
      provide: BookRepository,
      useValue: BookPostgresRepository,
    },
    CreateBookUseCase,
    RetrieveBookUseCase,
    RetrieveBooksUseCase,
  ],
})
export class BookModule {}
