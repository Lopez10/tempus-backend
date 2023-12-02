import { PaginationQueryParams, UseCase } from '@common';
import { RestaurantRepositoryPort } from '../../../domain/Restaurant.respository.port';
import { RestaurantDTO, RestaurantMapper } from '../../../Restaurant.mapper';

export interface RetrieveRestaurantsPaginatedByCriteriaDTO {
  criteria?: any;
  pagination: PaginationQueryParams;
}

export class RetrieveRestaurantsPaginatedByCriteriaUseCase
  implements
    UseCase<RetrieveRestaurantsPaginatedByCriteriaDTO, RestaurantDTO[]>
{
  constructor(private readonly repository: RestaurantRepositoryPort) {}

  async run(
    request: RetrieveRestaurantsPaginatedByCriteriaDTO,
  ): Promise<RestaurantDTO[]> {
    const { data } = await this.repository.findPaginationByCriteria(
      request.criteria,
      request.pagination,
    );

    const restaurantsDTO = data.map(RestaurantMapper.toDTO);

    return restaurantsDTO;
  }
}
