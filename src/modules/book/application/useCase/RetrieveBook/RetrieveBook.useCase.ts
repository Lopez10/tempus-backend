import { ID, UseCase } from '@common';
import { RetrieveBookDTO } from './RetrieveBookDTO';
import { BookDTO, BookMapper } from '@modules/book/Book.mapper';
import { Inject, Injectable } from '@nestjs/common';
import { BookRepository, BookRepositoryPort } from '@modules/book/domain';

@Injectable()
export class RetrieveBookUseCase implements UseCase<RetrieveBookDTO, BookDTO> {
  constructor(
    @Inject(BookRepository)
    private readonly bookPostgresRepository: BookRepositoryPort,
  ) {}
  async run(retrieveBookDTO: RetrieveBookDTO): Promise<BookDTO | null> {
    try {
      const id = new ID(retrieveBookDTO.id);
      const book = await this.bookPostgresRepository.findOneById(id);

      if (!book) throw new Error('Book not found');

      return BookMapper.toDTO(book);
    } catch (error) {
      throw new Error(error);
    }
  }
}
