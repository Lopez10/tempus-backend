import { ID, UseCase } from '@common';
import { Inject, Injectable } from '@nestjs/common';
import {
  AvailableRepository,
  AvailableRepositoryPort,
} from '../domain/Available.repository.port';
import { Available } from '../domain/Available.entity';

export interface RetrieveAvailableDTO {
  availableId: string;
  //   areaId: string;
  //   start: Date;
  //   finish: Date;
  //   available: number;
}

@Injectable()
export class RetrieveAvailableUseCase
  implements UseCase<RetrieveAvailableDTO, Available>
{
  constructor(
    @Inject(AvailableRepository)
    private readonly repository: AvailableRepositoryPort,
  ) {}
  async run(retrieveAvailableDTO: RetrieveAvailableDTO): Promise<Available> {
    const id = new ID(retrieveAvailableDTO.availableId);
    const available = await this.repository.findOneById(id);

    return available;
  }
}
