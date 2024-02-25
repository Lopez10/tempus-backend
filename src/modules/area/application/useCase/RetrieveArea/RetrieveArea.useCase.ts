import { ID, UseCase } from '@common';
import { AreaDto, AreaMapper } from '../../../Area.mapper';
import { Inject, Injectable } from '@nestjs/common';
import {
  AreaRepository,
  AreaRepositoryPort,
} from '../../../domain/Area.repository.port';
import { RetrieveAreaDTO } from './RetrieveArea.dto';

@Injectable()
export class RetrieveAreaUseCase implements UseCase<RetrieveAreaDTO, AreaDto> {
  constructor(
    @Inject(AreaRepository)
    private readonly areaPostgresRepository: AreaRepositoryPort,
  ) {}
  async run(retrieveAreaDTO: RetrieveAreaDTO): Promise<AreaDto | null> {
    try {
      const id = new ID(retrieveAreaDTO.id);

      const area = await this.areaPostgresRepository.findOneById(id);

      if (!area) throw new Error('Area not found');

      return AreaMapper.toDTO(area);
    } catch (error) {
      throw new Error(error);
    }
  }
}
