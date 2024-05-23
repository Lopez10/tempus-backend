import { UseCase } from '@common';
import { RestaurantRepositoryPort } from '../../../domain/restaurant.respository.port';
import { RestaurantMapper } from '../../../restaurant.mapper';
import { RetrieveRestaurantsDto } from './retrieve-restaurants.dto';
import { RestaurantDto } from '@modules/restaurant/restaurant.dto';

export class RetrieveRestaurantsUseCase
	implements UseCase<RetrieveRestaurantsDto, RestaurantDto[]>
{
	constructor(private readonly repository: RestaurantRepositoryPort) {}

	async run(
		retrieveRestaurantsDTO: RetrieveRestaurantsDto,
	): Promise<RestaurantDto[]> {
		const { data } = await this.repository.findPaginationByCriteria(
			retrieveRestaurantsDTO.pagination,
			retrieveRestaurantsDTO.criteria,
		);

		const restaurantsDTO = data.map(RestaurantMapper.toDTO);

		return restaurantsDTO;
	}
}
