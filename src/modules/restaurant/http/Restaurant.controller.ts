import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RestaurantPostgresRepository } from '../infrastructure/restaurant.postgres.repository';
import { CreateRestaurant } from '../application/Create/CreateRestaurant';
import { RestaurantProps } from '../domain/Restaurant.entity';
import { Description, Email, Name } from '@common';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    @Inject(RestaurantPostgresRepository)
    private readonly restaurantPostgresRepository: RestaurantPostgresRepository,
  ) {}

  @Post()
  async createRestaurant() {
    const restaurantProps: RestaurantProps = {
      name: new Name('Restaurant name'),
      email: new Email('restaurant@prueba.com'),
      description: new Description('Restaurant description'),
    };
    const restaurant = new CreateRestaurant(this.restaurantPostgresRepository);
    const restaurantCreated = await restaurant.run(restaurantProps);
    const restaurantDTO = restaurantCreated.toPrimitives();

    return restaurantDTO;
  }
}
