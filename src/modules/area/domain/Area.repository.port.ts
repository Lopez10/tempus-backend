import { ID, RepositoryPort } from '@common';
import { Area } from './Area.entity';

export interface AreaRepositoryPort extends RepositoryPort<Area> {
  findByRestaurantId(restaurantId: ID): Promise<Area[]>;
}

export const AreaRepository = Symbol('AreaRepository');
