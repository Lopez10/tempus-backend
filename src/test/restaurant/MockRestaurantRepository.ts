import { Name, ID, PaginationQueryParams, Paginated } from '@common';
import { Restaurant } from 'src/modules/restaurant/domain/Restaurant.entity';
import { RestaurantRepositoryPort } from '../../../src/modules/restaurant/domain/Restaurant.respository.port';

export class MockRestaurantRepository implements RestaurantRepositoryPort {
  findByRestaurantName(name: Name): Promise<Restaurant> {
    throw new Error('Method not implemented.');
  }
  insert(entity: Restaurant): Promise<Restaurant> {
    throw new Error('Method not implemented.');
  }
  insertSome(entity: Restaurant[]): Promise<Restaurant[]> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: ID): Promise<Restaurant> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Restaurant[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: ID): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findPaginationByCriteria(
    paginated: PaginationQueryParams,
    criteria?: any,
  ): Promise<Paginated<Restaurant>> {
    throw new Error('Method not implemented.');
  }
  update(entity: Restaurant): Promise<Restaurant> {
    throw new Error('Method not implemented.');
  }
  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
