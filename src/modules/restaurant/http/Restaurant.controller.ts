import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { RestaurantPostgresRepository } from '../infrastructure/Restaurant.postgres.repository';
import {
  CreateRestaurant,
  CreateRestaurantDTO,
} from '../application/UseCase/Create/CreateRestaurant';
import { RestaurantDTO, RestaurantMapper } from '../Restaurant.mapper';
import {
  RetrieveRestaurantsPaginatedByCriteria,
  RetrieveRestaurantsPaginatedByCriteriaDTO as RetrieveRestaurantsByPaginatedDTO,
} from '../application/UseCase/RetrieveAll/RetrieveAllRestaurants';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(
    @Inject(RestaurantPostgresRepository)
    private readonly restaurantPostgresRepository: RestaurantPostgresRepository,
  ) {}

  @Post()
  async createRestaurant(
    @Body() createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<RestaurantDTO> {
    const createRestaurant = new CreateRestaurant(
      this.restaurantPostgresRepository,
    );

    const restaurantCreated = await createRestaurant.run(createRestaurantDTO);

    return RestaurantMapper.toDTO(restaurantCreated);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The restaurants has been successfully retrieved.',
    type: Promise<RestaurantDTO[]>,
  })
  async getRestaurants(
    @Body() request: RetrieveRestaurantsByPaginatedDTO,
  ): Promise<RestaurantDTO[]> {
    const retrieveRestaurantsPaginatedByCriteria =
      new RetrieveRestaurantsPaginatedByCriteria(
        this.restaurantPostgresRepository,
      );

    const restaurantsDTO = await retrieveRestaurantsPaginatedByCriteria.run(
      request,
    );

    return restaurantsDTO;
  }
}
