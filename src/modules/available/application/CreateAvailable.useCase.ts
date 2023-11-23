import { DateTime, ID, UseCase } from '@common';
import { Inject, Injectable } from '@nestjs/common';
import {
  AvailableRepository,
  AvailableRepositoryPort,
} from '../domain/Available.repository.port';
import { Available } from '../domain/Available.entity';

export interface CreateAvailableDTO {
  areaId: string;
  date: Date;
  available: number;
}

@Injectable()
export class CreateAvailableUseCase
  implements UseCase<CreateAvailableDTO, Available>
{
  constructor(
    @Inject(AvailableRepository)
    private readonly repository: AvailableRepositoryPort,
  ) {}

  async run(createAvailableDTO: CreateAvailableDTO): Promise<Available> {
    const availableProps = {
      areaId: new ID(createAvailableDTO.areaId),
      date: new DateTime(createAvailableDTO.date),
      available: createAvailableDTO.available,
    };

    const available = Available.create(availableProps);
    await this.repository.insert(available);

    return available;
  }
}
