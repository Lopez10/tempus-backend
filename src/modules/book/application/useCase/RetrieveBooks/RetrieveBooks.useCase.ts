import { UseCase } from '@common';
import { Inject, Injectable } from '@nestjs/common';
import { RetrieveBooksDTO as RetrieveBooks } from './RetrieveBooksDTO';
import { BookRepository, BookRepositoryPort } from '@modules/book/domain';
import { BookDTO, BookMapper } from '@modules/book/Book.mapper';

@Injectable()
export class RetrieveBooksUseCase implements UseCase<RetrieveBooks, BookDTO[]> {
  constructor(
    @Inject(BookRepository)
    private readonly repository: BookRepositoryPort,
  ) {}

  async run(bookDTO: RetrieveBooks): Promise<BookDTO[]> {
    const { data } = await this.repository.findPaginationByCriteria(
      bookDTO.criteria,
      bookDTO.pagination,
    );

    const books = data.map(BookMapper.toDTO);

    return books;
  }
}
