import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { RestaurantPostgresRepository } from '../infrastructure/restaurant.postgres.repository';
import { CreateRestaurantUseCase } from '../application/use-case/create-restaurant/create-restaurant.use-case';
import { RestaurantMapper } from '../restaurant.mapper';
import { RetrieveRestaurantsUseCase } from '../application/use-case/retrieve-restaurants/retrieve-restaurants.use-case';
import { ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RetrieveRestaurantsDto } from '../application/use-case/retrieve-restaurants/retrieve-restaurants.dto';
import { CreateRestaurantDto } from '../application/use-case/create-restaurant/create-restaurant.dto';
import { RestaurantDto } from '../restaurant.dto';
import { PaginationQueryParams } from '@common';

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
	@ApiOkResponse({
		status: 200,
		description: 'The restaurants has been successfully retrieved.',
		type: [RestaurantDto],
	})
	@ApiQuery({ name: 'criteria', type: String, required: false })
	@ApiQuery({ name: 'limit', type: Number, example: 10 })
	@ApiQuery({ name: 'offset', type: Number, example: 0 })
	@ApiQuery({ name: 'page', type: Number, example: 0 })
	@ApiQuery({ name: 'orderByField', type: String, example: 'name' })
	@ApiQuery({ name: 'orderByParam', type: String, example: 'asc' })
	async getRestaurants(
		@Query('criteria') criteria: string,
		@Query('limit') limit: number,
		@Query('offset') offset: number,
		@Query('page') page: number,
		@Query('orderByField') orderByField: string,
		@Query('orderByParam') orderByParam: string,
	): Promise<RestaurantDto[]> {
		const pagination: PaginationQueryParams = {
			limit,
			offset,
			page,
			orderByField,
			orderByParam,
		};
		const retrieveRestaurantsDTO: RetrieveRestaurantsDto = {
			criteria,
			pagination,
		};

		const retrieveRestaurants = new RetrieveRestaurantsUseCase(
			this.restaurantPostgresRepository,
		);

		const restaurantsDTO = await retrieveRestaurants.run(
			retrieveRestaurantsDTO,
		);

		return restaurantsDTO;
	}
}
