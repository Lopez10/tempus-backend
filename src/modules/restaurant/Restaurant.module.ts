import { Module } from '@nestjs/common';
import { RestaurantController } from './http/Restaurant.controller';
import { RestaurantPostgresRepository } from './infrastructure/restaurant.postgres.repository';
import { RestaurantRepository } from './domain/Restaurant.respository.port';
import { RestaurantCreator } from './application/Create/RestaurantCreator';
import { InMemoryEventBus } from '@common/infrastructure/event/InMemoryEventBus';

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
    RestaurantCreator,
  ],
  exports: [],
})
export class RestaurantModule {}
