import { Controller, Get, Inject } from '@nestjs/common';
import { RestaurantPostgresRepository } from '../infrastructure/restaurant.postgres.repository';
import { RestaurantCreator } from '../application/Create/RestaurantCreator';
import { InMemoryEventBus } from '@common/infrastructure/event/InMemoryEventBus';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    @Inject(RestaurantPostgresRepository)
    private readonly restaurantPostgresRepository: RestaurantPostgresRepository,
  ) {}

  @Get()
  async testDomainEvent() {
    InMemoryEventBus;
    const restaurant = new RestaurantCreator(
      this.restaurantPostgresRepository,
      new InMemoryEventBus([]),
    );
    console.log(restaurant);

    return restaurant;
  }
}
