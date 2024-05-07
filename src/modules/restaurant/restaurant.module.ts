import { Module } from '@nestjs/common';
import { RestaurantController } from './http/restaurant.controller';
import { RestaurantPostgresRepository } from './infrastructure/restaurant.postgres.repository';
import { RestaurantRepository } from './domain/restaurant.respository.port';
import { CreateRestaurantUseCase } from './application/use-case/create-restaurant/create-restaurant.use-case';
import { RetrieveRestaurantsUseCase } from './application/use-case/retrieve-restaurants/retrieve-restaurants.use-case';

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
