import { RepositoryPort } from '@common';
import { Area } from './Area.entity';

export interface AreaRepositoryPort extends RepositoryPort<Area> {
  findByAreaName(name: string): Promise<Area | null>;
}

export const AreaRepository = Symbol('AreaRepository');
