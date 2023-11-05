import { Inject, Injectable } from '@nestjs/common';
import { Restaurant, RestaurantProps } from '../../domain/Restaurant.entity';
import {
  RestaurantRepository,
  RestaurantRepositoryPort,
} from '../../domain/Restaurant.respository.port';
import { UseCase } from '@common';

@Injectable()
export class CreateRestaurant implements UseCase<RestaurantProps, Restaurant> {
  constructor(
    @Inject(RestaurantRepository)
    private readonly repository: RestaurantRepositoryPort,
  ) {}

  async run(restaurantProps: RestaurantProps): Promise<Restaurant> {
    const restaurant = Restaurant.create(restaurantProps);
    await this.repository.insert(restaurant);

    return restaurant;
  }
}
