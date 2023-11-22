import { ID, RepositoryPort } from '@common';
import { Available } from './Available.entity';

export interface AvailableRepositoryPort extends RepositoryPort<Available> {
  findByAreaId(areaId: ID): Promise<Available | null>;
}

export const RestaurantRepository = Symbol('AvailableRepository');
