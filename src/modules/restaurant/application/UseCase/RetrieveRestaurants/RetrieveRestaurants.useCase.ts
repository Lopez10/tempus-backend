import { UseCase } from '@common';
import { RestaurantRepositoryPort } from '../../../domain/Restaurant.respository.port';
import { RestaurantDTO, RestaurantMapper } from '../../../Restaurant.mapper';
import { RetrieveRestaurantsDTO } from './RetrieveRestaurantsDTO';

export class RetrieveRestaurantsUseCase
  implements UseCase<RetrieveRestaurantsDTO, RestaurantDTO[]>
{
  constructor(private readonly repository: RestaurantRepositoryPort) {}

  async run(
    retrieveRestaurantsDTO: RetrieveRestaurantsDTO,
  ): Promise<RestaurantDTO[]> {
    const { data } = await this.repository.findPaginationByCriteria(
      retrieveRestaurantsDTO.criteria,
      retrieveRestaurantsDTO.pagination,
    );

    const restaurantsDTO = data.map(RestaurantMapper.toDTO);

    return restaurantsDTO;
  }
}
