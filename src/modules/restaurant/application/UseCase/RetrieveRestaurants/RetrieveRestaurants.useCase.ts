import { UseCase } from '@common';
import { RestaurantRepositoryPort } from '../../../domain/Restaurant.respository.port';
import { RestaurantDTO, RestaurantMapper } from '../../../Restaurant.mapper';
import { RetrieveRestaurantsDto } from './RetrieveRestaurants.dto';

export class RetrieveRestaurantsUseCase
  implements UseCase<RetrieveRestaurantsDto, RestaurantDTO[]>
{
  constructor(private readonly repository: RestaurantRepositoryPort) {}

  async run(
    retrieveRestaurantsDTO: RetrieveRestaurantsDto,
  ): Promise<RestaurantDTO[]> {
    const { data } = await this.repository.findPaginationByCriteria(
      retrieveRestaurantsDTO.criteria,
      retrieveRestaurantsDTO.pagination,
    );

    const restaurantsDTO = data.map(RestaurantMapper.toDTO);

    return restaurantsDTO;
  }
}
