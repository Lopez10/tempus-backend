import { Module } from '@nestjs/common';
import { RestaurantController } from './http/Restaurant.controller';
import { RestaurantPostgresRepository } from './infrastructure/restaurant.postgres.repository';
import { RestaurantRepository } from './domain/Restaurant.respository.port';
import { CreateRestaurantUseCase } from './application/UseCase/CreateRestaurant/CreateRestaurant.useCase';
import { RetrieveRestaurantsUseCase } from './application/UseCase/RetrieveRestaurants/RetrieveRestaurants.useCase';

@Module({
  controllers: [RestaurantController],
  providers: [
    RestaurantController,
    RestaurantPostgresRepository,
    {
      provide: RestaurantRepository,
      useClass: RestaurantPostgresRepository,
    },
    CreateRestaurantUseCase,
    RetrieveRestaurantsUseCase,
  ],
  exports: [],
})
export class RestaurantModule {}
