import { ID, DateTime } from '@common';
import { Available } from './domain/Available.entity';

export interface AvailableDTO {
  id: string;
  areaId: string;
  available: number;
  start: Date;
  finish: Date;
}

export class AvailableMapper {
  static toDomain(availableDTO: AvailableDTO): Available {
    return Available.create(
      {
        areaId: new ID(availableDTO.areaId),
        available: availableDTO.available,
        start: new DateTime(availableDTO.start),
        finish: new DateTime(availableDTO.finish),
      },
      new ID(availableDTO.id),
    );
  }

  static toDTO(available: Available): AvailableDTO {
    return {
      id: available.id.value,
      areaId: available.getPropsCopy().areaId.value,
      available: available.getPropsCopy().available,
      start: available.getPropsCopy().start.value,
      finish: available.getPropsCopy().finish.value,
    };
  }
}
