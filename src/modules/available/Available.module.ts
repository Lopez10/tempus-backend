import { Module } from '@nestjs/common';
import { AvailableController } from './http/Available.controller';
import { AvailablePostgresRepository } from './infrastructure/Available.postgres.repository';
import { AvailableRepository } from './domain/Available.repository.port';
import { CreateAvailableUseCase } from './application/CreateAvailable/CreateAvailable.useCase';
import { CreateMultipleAvailableByDateUseCase } from './application/CreateMultipleAvailableByDate/CreateMultipleAvailableByDate.useCase';
import { RetrieveAvailableUseCase } from './application/RetrieveAvailable/RetrieveAvailable.useCase';

@Module({
  imports: [],
  controllers: [AvailableController],
  providers: [
    AvailableController,
    AvailablePostgresRepository,
    {
      provide: AvailableRepository,
      useClass: AvailablePostgresRepository,
    },
    CreateAvailableUseCase,
    CreateMultipleAvailableByDateUseCase,
    RetrieveAvailableUseCase,
  ],
  exports: [],
})
export class AvailableModule {}
