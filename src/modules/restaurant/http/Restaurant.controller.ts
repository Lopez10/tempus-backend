import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { RestaurantPostgresRepository } from '../infrastructure/Restaurant.postgres.repository';
import { CreateRestaurantUseCase } from '../application/UseCase/CreateRestaurant/CreateRestaurant.useCase';
import { RestaurantDTO, RestaurantMapper } from '../Restaurant.mapper';
import { RetrieveRestaurantsUseCase } from '../application/UseCase/RetrieveRestaurants/RetrieveRestaurants.useCase';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RetrieveRestaurantsDto } from '../application/UseCase/RetrieveRestaurants/RetrieveRestaurants.dto';
import { CreateRestaurantDto } from '../application/UseCase/CreateRestaurant/CreateRestaurant.dto';

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
  ): Promise<RestaurantDTO> {
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
    type: Promise<RestaurantDTO[]>,
  })
  async getRestaurants(
    @Body() retrieveRestaurantsDTO: RetrieveRestaurantsDto,
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
