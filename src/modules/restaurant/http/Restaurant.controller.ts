import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { RestaurantPostgresRepository } from '../infrastructure/Restaurant.postgres.repository';
import { CreateRestaurantUseCase } from '../application/UseCase/CreateRestaurant/CreateRestaurant.useCase';
import { RestaurantDTO, RestaurantMapper } from '../Restaurant.mapper';
import { RetrieveRestaurantsUseCase } from '../application/UseCase/RetrieveRestaurants/RetrieveRestaurants.useCase';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RetrieveRestaurantsDTO } from '../application/UseCase/RetrieveRestaurants/RetrieveRestaurantsDTO';
import { CreateRestaurantDTO } from '../application/UseCase/CreateRestaurant/CreateRestaurantDTO';

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
    const createRestaurant = new CreateRestaurantUseCase(
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
    @Body() retrieveRestaurantsDTO: RetrieveRestaurantsDTO,
  ): Promise<RestaurantDTO[]> {
    const retrieveRestaurants = new RetrieveRestaurantsUseCase(
      this.restaurantPostgresRepository,
    );

    const restaurantsDTO = await retrieveRestaurants.run(
      retrieveRestaurantsDTO,
    );

    return restaurantsDTO;
  }
}
