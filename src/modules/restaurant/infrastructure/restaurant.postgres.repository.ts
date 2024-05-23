import { ID, Name, Paginated, PaginationQueryParams } from '@common/domain';
import { RestaurantRepositoryPort } from '../domain/restaurant.respository.port';
import { Restaurant } from '../domain/restaurant.aggregate-root';
import { PrismaClient, Restaurant as restaurantModel } from '@prisma/client';
import { RestaurantMapper } from '../restaurant.mapper';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { RestaurantDto } from '../restaurant.dto';

@Injectable()
export class RestaurantPostgresRepository implements RestaurantRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}

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

	async findOneById(id: ID): Promise<Restaurant> {
		const restaurantFound: RestaurantDto =
			await this.prisma.restaurant.findUnique({
				where: { id: id.value },
			});

		if (!restaurantFound) {
			throw new Error('Restaurant not found');
		}

		const restaurant: Restaurant = RestaurantMapper.toDomain(restaurantFound);

		return restaurant;
	}

	findAll(): Promise<Restaurant[]> {
		throw new Error('Method not implemented.');
	}
	delete(id: ID): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
	async findPaginationByCriteria(
		pagination: PaginationQueryParams,
		criteria?: unknown,
	): Promise<Paginated<Restaurant>> {
		const { page, limit: take } = pagination;

		const restaurants = await this.prisma.restaurant.findMany({
			skip: page * take,
			take: Number(take),
			where: criteria ?? {},
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
