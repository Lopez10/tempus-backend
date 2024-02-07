import { Name, ID, PaginationQueryParams, Paginated } from '@common';
import {
  Restaurant,
  RestaurantDTO,
  RestaurantMapper,
  RestaurantRepositoryPort,
} from '@modules';

export class RestaurantMockRepository implements RestaurantRepositoryPort {
  private restaurantsDTO: RestaurantDTO[] = [];

  findByRestaurantName(name: Name): Promise<Restaurant> {
    throw new Error('Method not implemented.');
  }
  insert(entity: Restaurant): Promise<Restaurant> {
    const restaurantDTO = RestaurantMapper.toDTO(entity);
    this.restaurantsDTO.push(restaurantDTO);

    return Promise.resolve(entity);
  }
  insertSome(entity: Restaurant[]): Promise<Restaurant[]> {
    const restaurantsDTO = entity.map((restaurant) =>
      RestaurantMapper.toDTO(restaurant),
    );
    this.restaurantsDTO.push(...restaurantsDTO);

    return Promise.resolve(entity);
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
    const restaurantsDTO = this.restaurantsDTO.filter((restaurant) => {
      if (criteria?.restaurantId) {
        return restaurant.id === criteria.restaurantId;
      }
      return true;
    });

    const restaurants = restaurantsDTO.map(RestaurantMapper.toDomain);

    return Promise.resolve({
      data: restaurants,
      count: restaurants.length,
      limit: paginated.limit,
      page: paginated.page,
    });
  }
  update(entity: Restaurant): Promise<Restaurant> {
    throw new Error('Method not implemented.');
  }
  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
