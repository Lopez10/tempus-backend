import { Module } from '@nestjs/common';
import { RestaurantController } from './http/Restaurant.controller';
import { RestaurantPostgresRepository } from './infrastructure/Restaurant.postgres.repository';
import { RestaurantRepository } from './domain/Restaurant.respository.port';
import { CreateRestaurantUseCase } from './application/UseCase/CreateRestaurant/CreateRestaurant.useCase';
import { RetrieveRestaurantsPaginatedByCriteriaUseCase } from './application/UseCase/RetrieveRestaurantsPaginatedByCriteria/RetrieveRestaurantsPaginatedByCriteria.useCase';

@Module({
  imports: [],
  controllers: [RestaurantController],
  providers: [
    RestaurantController,
    RestaurantPostgresRepository,
    {
      provide: RestaurantRepository,
      useClass: RestaurantPostgresRepository,
    },
    CreateRestaurantUseCase,
    RetrieveRestaurantsPaginatedByCriteriaUseCase,
  ],
  exports: [],
})
export class RestaurantModule {}
