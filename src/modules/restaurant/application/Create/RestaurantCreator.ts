import { Injectable } from '@nestjs/common';
import { Restaurant, RestaurantProps } from '../../domain/Restaurant.entity';
import { RestaurantRepositoryPort } from '../../domain/Restaurant.respository.port';
import { UseCase } from '@common/domain/useCase.base';

@Injectable()
export class RestaurantCreator implements UseCase<RestaurantProps, Restaurant> {
  constructor(private readonly repository: RestaurantRepositoryPort) {}

  async run(restaurantProps: RestaurantProps): Promise<Restaurant> {
    const restaurant = Restaurant.create(restaurantProps);
    await this.repository.insert(restaurant);

    return restaurant;
  }
}
