import { Module } from '@nestjs/common';
import { AreaRepository } from './domain/Area.repository.port';
import { AreaPostgresRepository } from './infrastructure/Area.postgre.repository';
import { AreaController } from './http/Area.controller';
import { RetrieveAreaUseCase } from './application/UseCases/RetrieveArea.useCase';
import { RetrieveAreasByRestaurantIdUseCase } from './application/UseCases/RetrieveAreasByRestaurantId/RetrieveAreasByRestaurantId.useCase';
import { CreateAreaUseCase } from './application/UseCases/CreateArea.useCase';
import { RetrieveAreasUseCase } from './application/UseCases/RetrieveAreas/RetrieveAreas.useCase';

@Module({
  controllers: [AreaController],
  providers: [
    AreaController,
    AreaPostgresRepository,
    {
      provide: AreaRepository,
      useValue: AreaPostgresRepository,
    },
    RetrieveAreaUseCase,
    RetrieveAreasByRestaurantIdUseCase,
    CreateAreaUseCase,
    RetrieveAreasUseCase,
  ],
})
export class AreaModule {}
