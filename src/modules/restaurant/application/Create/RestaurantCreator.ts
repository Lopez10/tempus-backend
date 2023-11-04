import { EventBus } from '@common/domain/event/EventBus';
import { Restaurant, restaurantProps } from '../../domain/Restaurant.entity';
import { RestaurantRepositoryPort } from '../../domain/Restaurant.respository.port';
import { ID } from '@common';

export class RestaurantCreator {
  constructor(
    private repository: RestaurantRepositoryPort,
    private eventBus: EventBus,
  ) {}

  async run(params: restaurantProps, id?: ID): Promise<void> {
    const restaurant = Restaurant.create(params, id);
    await this.repository.insert(restaurant);
    await this.eventBus.publish(restaurant.pullDomainEvents());
  }
}
