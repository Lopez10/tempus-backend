import { Paginated, PaginatedQueryParams, UseCase } from '@common';
import { Restaurant } from '../../domain/Restaurant.entity';
import { RestaurantRepositoryPort } from '../../domain/Restaurant.respository.port';

export interface RetrieveRestaurantsPaginatedByCriteriaDTO {
  criteria: any;
  paginated: PaginatedQueryParams;
}

export class RetrieveRestaurantsPaginatedByCriteria
  implements
    UseCase<RetrieveRestaurantsPaginatedByCriteriaDTO, Paginated<Restaurant>>
{
  constructor(private readonly repository: RestaurantRepositoryPort) {}

  async run(
    request: RetrieveRestaurantsPaginatedByCriteriaDTO,
  ): Promise<Paginated<Restaurant>> {
    const restaurantsPaginatedByCriteria =
      await this.repository.findPaginatedByCriteria(
        request.criteria,
        request.paginated,
      );

    return restaurantsPaginatedByCriteria;
  }
}
