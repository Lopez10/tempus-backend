import { Restaurant, restaurantProps } from '../../domain/Restaurant.entity';
import { RestaurantRepositoryPort } from '../../domain/Restaurant.respository.port';

export class RestaurantCreator {
  constructor(private readonly repository: RestaurantRepositoryPort) {}

  async run(restaurantProps: restaurantProps) {
    const restaurant = Restaurant.create(restaurantProps);
    await this.repository.insert(restaurant);

    return restaurant;
  }
}
