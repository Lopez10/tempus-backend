import { ID, UseCase } from '@common';
import { Inject, Injectable } from '@nestjs/common';
import {
  AvailableRepository,
  AvailableRepositoryPort,
} from '../../../domain/Available.repository.port';
import { AvailableDTO, AvailableMapper } from '../../../Available.mapper';
import { RetrieveAvailableDTO } from './RetrieveAvailableDTO';

@Injectable()
export class RetrieveAvailableUseCase
  implements UseCase<RetrieveAvailableDTO, AvailableDTO>
{
  constructor(
    @Inject(AvailableRepository)
    private readonly repository: AvailableRepositoryPort,
  ) {}
  async run(retrieveAvailableDTO: RetrieveAvailableDTO): Promise<AvailableDTO> {
    const id = new ID(retrieveAvailableDTO.availableId);
    const available = await this.repository.findOneById(id);

    return AvailableMapper.toDTO(available);
  }
}
