import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RestaurantPostgresRepository } from '../infrastructure/restaurant.postgres.repository';
import { RestaurantCreator } from '../application/Create/RestaurantCreator';
import { RestaurantProps } from '../domain/Restaurant.entity';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    @Inject(RestaurantPostgresRepository)
    private readonly restaurantPostgresRepository: RestaurantPostgresRepository,
  ) {}

  @Post()
  async createRestaurant(@Body() restaurantProps: RestaurantProps) {
    const restaurant = new RestaurantCreator(this.restaurantPostgresRepository);
    const restaurantCreated = await restaurant.run(restaurantProps);
    const restaurantDTO = restaurantCreated.toPrimitives();

    return restaurantDTO;
  }
}
