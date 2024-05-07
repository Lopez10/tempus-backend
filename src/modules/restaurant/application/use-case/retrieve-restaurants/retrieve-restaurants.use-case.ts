import { UseCase } from '@common';
import { RestaurantRepositoryPort } from '../../../domain/restaurant.respository.port';
import { RestaurantDto, RestaurantMapper } from '../../../restaurant.mapper';
import { RetrieveRestaurantsDto } from './retrieve-restaurants.dto';

export class RetrieveRestaurantsUseCase
	implements UseCase<RetrieveRestaurantsDto, RestaurantDto[]>
{
	constructor(private readonly repository: RestaurantRepositoryPort) {}

	async run(
		retrieveRestaurantsDTO: RetrieveRestaurantsDto,
	): Promise<RestaurantDto[]> {
		const { data } = await this.repository.findPaginationByCriteria(
			retrieveRestaurantsDTO.criteria,
			retrieveRestaurantsDTO.pagination,
		);

		const restaurantsDTO = data.map(RestaurantMapper.toDTO);

		return restaurantsDTO;
	}
}
