import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { RestaurantPostgresRepository } from '../infrastructure/restaurant.postgres.repository';
import {
  CreateRestaurant,
  CreateRestaurantDTO,
} from '../application/UseCase/Create/CreateRestaurant';
import { RestaurantDTO, RestaurantMapper } from '../Restaurant.mapper';
import {
  RetrieveRestaurantsPaginatedByCriteria,
  RetrieveRestaurantsPaginatedByCriteriaDTO as RetrieveRestaurantsByPaginatedDTO,
} from '../application/UseCase/RetrieveAll/RetrieveAllRestaurants';

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
