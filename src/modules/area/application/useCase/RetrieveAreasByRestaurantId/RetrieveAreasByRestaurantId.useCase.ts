import { AreaDTO, AreaMapper } from '../../../../../modules/area/Area.mapper';
import { RetrieveAreasByRestaurantIdDto } from './RetrieveAreasByRestaurantId.dto';
import { ID, UseCase } from '@common';
import { AreaRepositoryPort } from '../../../../../modules/area/domain/Area.repository.port';

export class RetrieveAreasByRestaurantIdUseCase
  implements UseCase<RetrieveAreasByRestaurantIdDto, AreaDTO[]>
{
  constructor(private readonly repository: AreaRepositoryPort) {}

  async run(
    retrieveAreasByRestaurantIdDTO: RetrieveAreasByRestaurantIdDto,
  ): Promise<AreaDTO[]> {
    const restaurantId = new ID(retrieveAreasByRestaurantIdDTO.restaurantId);
    const areas = await this.repository.findByRestaurantId(restaurantId);

    const areasDTO = areas.map(AreaMapper.toDTO);

    return areasDTO;
  }
}
