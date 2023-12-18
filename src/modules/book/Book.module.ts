import { Module } from '@nestjs/common';
import { BookController } from './http';
import { BookPostgresRepository } from './infrastructure';
import {
  CreateBookUseCase,
  RetrieveBookUseCase,
  RetrieveBooksUseCase,
} from './application';

@Module({
  controllers: [BookController],
  providers: [
    BookController,
    BookPostgresRepository,
    {
      provide: BookPostgresRepository,
      useValue: BookPostgresRepository,
    },
    CreateBookUseCase,
    RetrieveBookUseCase,
    RetrieveBooksUseCase,
  ],
})
export class BookModule {}
