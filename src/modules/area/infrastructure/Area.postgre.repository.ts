import { ID, PaginatedQueryParams, Paginated } from '@common';
import { Area } from '../domain/Area.entity';
import { AreaRepositoryPort } from '../domain/Area.repository.port';

export class AreaPostgresRepository implements AreaRepositoryPort {
  findByAreaName(name: string): Promise<Area> {
    throw new Error('Method not implemented.');
  }
  insert(entity: Area): Promise<Area> {
    throw new Error('Method not implemented.');
  }
  insertSome(entity: Area[]): Promise<Area[]> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: ID): Promise<Area> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Area[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: ID): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findPaginatedByCriteria(
    criteria: any,
    params: PaginatedQueryParams,
  ): Promise<Paginated<Area>> {
    throw new Error('Method not implemented.');
  }
  update(entity: Area): Promise<Area> {
    throw new Error('Method not implemented.');
  }
  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
