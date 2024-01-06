import { UseCase } from '@common';
import { Inject, Injectable } from '@nestjs/common';
import { RetrieveAreasDto } from './RetrieveAreas.dto';
import {
  AreaRepository,
  AreaRepositoryPort,
} from '../../../../../modules/area/domain/Area.repository.port';
import { AreaDTO, AreaMapper } from '../../../../../modules/area/Area.mapper';

@Injectable()
export class RetrieveAreasUseCase
  implements UseCase<RetrieveAreasDto, AreaDTO[]>
{
  constructor(
    @Inject(AreaRepository)
    private readonly repository: AreaRepositoryPort,
  ) {}
  async run(retrieveAreasDTO: RetrieveAreasDto): Promise<AreaDTO[]> {
    const areas = await this.repository.findPaginationByCriteria(
      retrieveAreasDTO.criteria,
      retrieveAreasDTO.pagination,
    );

    const areasDTO = areas.data.map(AreaMapper.toDTO);

    return areasDTO;
  }
}
