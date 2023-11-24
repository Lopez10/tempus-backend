import { DateTime, ID, UseCase } from '@common';
import { AvailableDTO, AvailableMapper } from '../../Available.mapper';
import { AvailablePostgresRepository } from '../../infrastructure/Available.postgres.repository';
import { Available } from '../../domain/Available.entity';
import { CreateMultipleAvailableByDateDTO } from './CreateMultipleAvailableByDate';

export class CreateMultipleAvailableByDateUseCase
  implements UseCase<CreateMultipleAvailableByDateDTO, AvailableDTO[]>
{
  constructor(
    private readonly availablePostgresRepository: AvailablePostgresRepository,
  ) {}

  async run(
    createMultipleAvailableByDateDTO: CreateMultipleAvailableByDateDTO,
  ): Promise<AvailableDTO[]> {
    const { areaId, dates, available } = createMultipleAvailableByDateDTO;

    const availablesCreated = dates.map((date) =>
      Available.create({
        areaId: new ID(areaId),
        date: new DateTime(date),
        available,
      }),
    );

    const availablesInserted =
      await this.availablePostgresRepository.insertSome(availablesCreated);

    return availablesInserted.map((available) =>
      AvailableMapper.toDTO(available),
    );
  }
}
