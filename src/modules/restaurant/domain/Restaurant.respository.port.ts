import { Name, RepositoryPort } from '@common';
import { Restaurant } from './Restaurant.entity';

export interface RestaurantRepositoryPort extends RepositoryPort<Restaurant> {
  findByRestaurantName(name: Name): Promise<Restaurant | null>;
}

export const RestaurantRepository = Symbol('RestaurantRepository');
