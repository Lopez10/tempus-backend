import { InMemoryEventBus } from '@common/infrastructure/event/InMemoryEventBus';
import { Restaurant, restaurantProps } from '../../domain/Restaurant.entity';
import { RestaurantRepositoryPort } from '../../domain/Restaurant.respository.port';

export class RestaurantCreator {
  constructor(
    private readonly repository: RestaurantRepositoryPort,
    private readonly eventBus: InMemoryEventBus,
  ) {}

  async run(restaurantProps: restaurantProps) {
    console.log(restaurantProps);
    const restaurant = Restaurant.create(restaurantProps);
    await this.repository.insert(restaurant);
    this.eventBus.publish(restaurant.pullDomainEvents());

    return restaurant;
  }
}
