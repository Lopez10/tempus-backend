import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { RestaurantPostgresRepository } from '../infrastructure/restaurant.postgres.repository';
import { CreateRestaurantUseCase } from '../application/use-case/create-restaurant/create-restaurant.use-case';
import { RestaurantDto, RestaurantMapper } from '../restaurant.mapper';
import { RetrieveRestaurantsUseCase } from '../application/use-case/retrieve-restaurants/retrieve-restaurants.use-case';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RetrieveRestaurantsDto } from '../application/use-case/retrieve-restaurants/retrieve-restaurants.dto';
import { CreateRestaurantDto } from '../application/use-case/create-restaurant/create-restaurant.dto';

@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {
	constructor(
		@Inject(RestaurantPostgresRepository)
		private readonly restaurantPostgresRepository: RestaurantPostgresRepository,
	) {}

	@Post()
	async createRestaurant(
		@Body() createRestaurantDTO: CreateRestaurantDto,
	): Promise<RestaurantDto> {
		const createRestaurant = new CreateRestaurantUseCase(
			this.restaurantPostgresRepository,
		);

		const restaurantCreated = await createRestaurant.run(createRestaurantDTO);

		return RestaurantMapper.toDTO(restaurantCreated);
	}

	@Get('multiple')
	@ApiResponse({
		status: 200,
		description: 'The restaurants has been successfully retrieved.',
		type: Promise<RestaurantDto[]>,
	})
	async getRestaurants(
		@Body() retrieveRestaurantsDTO: RetrieveRestaurantsDto,
	): Promise<RestaurantDto[]> {
		const retrieveRestaurants = new RetrieveRestaurantsUseCase(
			this.restaurantPostgresRepository,
		);

		const restaurantsDTO = await retrieveRestaurants.run(
			retrieveRestaurantsDTO,
		);

		return restaurantsDTO;
	}
}
