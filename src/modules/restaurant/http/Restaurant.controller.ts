import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RestaurantPostgresRepository } from '../infrastructure/restaurant.postgres.repository';
import { CreateRestaurant } from '../application/Create/CreateRestaurant';
import { RestaurantDTO, RestaurantMapper } from '../Restaurant.mapper';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    @Inject(RestaurantPostgresRepository)
    private readonly restaurantPostgresRepository: RestaurantPostgresRepository,
  ) {}

  @Post()
  async createRestaurant(@Body() restaurantDTO: RestaurantDTO) {
    const createRestaurant = new CreateRestaurant(
      this.restaurantPostgresRepository,
    );

    const restaurantCreated = await createRestaurant.run(restaurantDTO);

    return RestaurantMapper.toDTO(restaurantCreated);
  }
}
