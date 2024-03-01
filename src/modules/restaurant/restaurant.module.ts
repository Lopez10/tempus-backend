import { Module } from '@nestjs/common';
import { RestaurantController } from './http/restaurant.controller';
import { RestaurantPostgresRepository } from './infrastructure/restaurant.postgres.repository';
import { RestaurantRepository } from './domain/restaurant.respository.port';
import { CreateRestaurantUseCase } from './application/useCase/createRestaurant/createRestaurant.useCase';
import { RetrieveRestaurantsUseCase } from './application/useCase/retrieveRestaurants/retrieveRestaurants.useCase';

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
