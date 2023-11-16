import { Module } from '@nestjs/common';
import { RestaurantController } from './http/Restaurant.controller';
import { RestaurantPostgresRepository } from './infrastructure/restaurant.postgres.repository';
import { RestaurantRepository } from './domain/Restaurant.respository.port';
import { CreateRestaurant } from './application/UseCase/Create/CreateRestaurant';

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
    CreateRestaurant,
  ],
  exports: [],
})
export class RestaurantModule {}
