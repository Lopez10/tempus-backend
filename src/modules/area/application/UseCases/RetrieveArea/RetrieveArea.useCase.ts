import { ID, UseCase } from '@common';
import { AreaDTO, AreaMapper } from '../../../Area.mapper';
import { AreaPostgresRepository } from '../../../infrastructure/Area.postgre.repository';
import { Inject } from '@nestjs/common';
import { AreaRepository } from '../../../domain/Area.repository.port';
import { RetrieveAreaDTO } from './RetrieveAreaDTO';

export class RetrieveAreaUseCase implements UseCase<RetrieveAreaDTO, AreaDTO> {
  constructor(
    @Inject(AreaRepository)
    private readonly areaPostgresRepository: AreaPostgresRepository,
  ) {}
  async run(retrieveAreaDTO: RetrieveAreaDTO): Promise<AreaDTO> {
    try {
      const id = new ID(retrieveAreaDTO.id);
      const area = await this.areaPostgresRepository.findOneById(id);
      return AreaMapper.toDTO(area);
    } catch (error) {
      throw new Error(error);
    }
  }
}
