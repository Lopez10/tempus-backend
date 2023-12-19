import { ID, CustomDate } from '@common';
import { Available } from './domain/Available.entity';

export interface AvailableDTO {
  id?: string;
  areaId: string;
  available: number;
  date: Date;
}

export class AvailableMapper {
  static toDomain(availableDTO: AvailableDTO): Available {
    return Available.create(
      {
        areaId: new ID(availableDTO.areaId),
        available: availableDTO.available,
        date: new CustomDate(availableDTO.date),
      },
      new ID(availableDTO.id),
    );
  }

  static toDTO(available: Available): AvailableDTO {
    return {
      id: available.id.value,
      areaId: available.getPropsCopy().areaId.value,
      available: available.getPropsCopy().available,
      date: available.getPropsCopy().date.value,
    };
  }
}
