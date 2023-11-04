import { ID } from '@common';
import { RestaurantRepositoryPort } from '../../domain/Restaurant.respository.port';

export class UpdateDescription {
  constructor(private readonly repository: RestaurantRepositoryPort) {}

  async run(restaurantId: ID, description?: string) {
    const restaurant = await this.repository.findOneById(restaurantId);

    // Update description code here

    return this.repository.update(restaurant);
  }
}
