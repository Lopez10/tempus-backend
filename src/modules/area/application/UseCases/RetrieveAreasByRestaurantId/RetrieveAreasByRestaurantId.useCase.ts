import { AreaDTO, AreaMapper } from 'src/modules/area/Area.mapper';
import { RetrieveAreasByRestaurantIdDTO } from './RetrieveAreasByRestaurantIdDTO';
import { ID, UseCase } from '@common';
import { AreaRepositoryPort } from 'src/modules/area/domain/Area.repository.port';

export class RetrieveAreasByRestaurantIdUseCase
  implements UseCase<RetrieveAreasByRestaurantIdDTO, AreaDTO[]>
{
  constructor(private readonly repository: AreaRepositoryPort) {}

  async run(
    retrieveAreasByRestaurantIdDTO: RetrieveAreasByRestaurantIdDTO,
  ): Promise<AreaDTO[]> {
    const restaurantId = new ID(retrieveAreasByRestaurantIdDTO.restaurantId);
    const areas = await this.repository.findByRestaurantId(restaurantId);

    const areasDTO = areas.map(AreaMapper.toDTO);

    return areasDTO;
  }
}
