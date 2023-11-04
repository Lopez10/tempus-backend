import { Controller, Inject } from '@nestjs/common';
import { RestaurantPostgresRepository } from '../infrastructure/restaurant.postgres.repository';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    @Inject(RestaurantPostgresRepository)
    private readonly restaurantPostgresRepository: RestaurantPostgresRepository,
  ) {}
}
