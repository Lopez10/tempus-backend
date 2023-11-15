import { PaginatedQueryParams, UseCase } from '@common';
import { RestaurantRepositoryPort } from '../../domain/Restaurant.respository.port';
import { RestaurantDTO, RestaurantMapper } from '../../Restaurant.mapper';

export interface RetrieveRestaurantsPaginatedByCriteriaDTO {
  criteria: any;
  paginated: PaginatedQueryParams;
}

export class RetrieveRestaurantsPaginatedByCriteria
  implements
    UseCase<RetrieveRestaurantsPaginatedByCriteriaDTO, RestaurantDTO[]>
{
  constructor(private readonly repository: RestaurantRepositoryPort) {}

  async run(
    request: RetrieveRestaurantsPaginatedByCriteriaDTO,
  ): Promise<RestaurantDTO[]> {
    const { data } = await this.repository.findPaginatedByCriteria(
      request.criteria,
      request.paginated,
    );

    const restaurantsDTO = data.map(RestaurantMapper.toDTO);

    return restaurantsDTO;
  }
}
