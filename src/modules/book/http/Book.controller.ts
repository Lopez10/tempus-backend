import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookPostgresRepository } from '../infrastructure';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(
    @Inject(BookPostgresRepository)
    private readonly bookPostgresRepository: BookPostgresRepository,
  ) {}
}
