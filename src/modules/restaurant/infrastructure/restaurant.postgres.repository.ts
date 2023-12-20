import { ID, Name, Paginated, PaginationQueryParams } from '@common/domain';
import { RestaurantRepositoryPort } from '../domain/Restaurant.respository.port';
import { Restaurant } from '../domain/Restaurant.entity';
import { PrismaClient, Restaurant as restaurantModel } from '@prisma/client';
import prisma from '@common/infrastructure/db';
import { RestaurantMapper } from '../Restaurant.mapper';

export class RestaurantPostgresRepository implements RestaurantRepositoryPort {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
  findByRestaurantName(name: Name): Promise<Restaurant> {
    throw new Error('Method not implemented.');
  }
  async insert(entity: Restaurant): Promise<Restaurant> {
    const restaurant: restaurantModel = RestaurantMapper.toDTO(entity);
    const restaurantCreated = await this.prisma.restaurant.create({
      data: restaurant,
    });

    return RestaurantMapper.toDomain(restaurantCreated);
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
  async findPaginationByCriteria(
    pagination: PaginationQueryParams,
    criteria?: any,
  ): Promise<Paginated<Restaurant>> {
    const { page, limit: take } = pagination;

    const restaurants = await this.prisma.restaurant.findMany({
      skip: page * take,
      take,
      where: criteria,
    });

    const total = await this.prisma.restaurant.count({ where: criteria });

    return {
      data: restaurants.map((restaurant) =>
        RestaurantMapper.toDomain(restaurant),
      ),
      page,
      count: total,
      limit: take,
    };
  }
  update(entity: Restaurant): Promise<Restaurant> {
    throw new Error('Method not implemented.');
  }
  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
