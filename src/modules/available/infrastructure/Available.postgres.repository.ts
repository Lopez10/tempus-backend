import { ID, PaginationQueryParams, Paginated } from '@common';
import { Available } from '../domain/Available.entity';
import { AvailableRepositoryPort } from '../domain/Available.repository.port';

export class AvailablePostgresRepository implements AvailableRepositoryPort {
  findByAreaId(areaId: ID): Promise<Available> {
    throw new Error('Method not implemented.');
  }
  insert(entity: Available): Promise<Available> {
    throw new Error('Method not implemented.');
  }
  insertSome(entity: Available[]): Promise<Available[]> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: ID): Promise<Available> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Available[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: ID): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findPaginationByCriteria(
    criteria: any,
    params: PaginationQueryParams,
  ): Promise<Paginated<Available>> {
    throw new Error('Method not implemented.');
  }
  update(entity: Available): Promise<Available> {
    throw new Error('Method not implemented.');
  }
  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
