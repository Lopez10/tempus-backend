import { Name, ID } from '@common';
import { Available } from './domain/Available.entity';

export interface AvailableDTO {
  id: string;
  name: string;
  areaId: string;
  available: number;
}

export class AvailableMapper {
  static toDomain(availableDTO: AvailableDTO): Available {
    return Available.create(
      {
        name: new Name(availableDTO.name),
        areaId: new ID(availableDTO.areaId),
        available: availableDTO.available,
      },
      new ID(availableDTO.id),
    );
  }

  static toDTO(available: Available): AvailableDTO {
    return {
      id: available.id.value,
      name: available.getPropsCopy().name.value,
      areaId: available.getPropsCopy().areaId.value,
      available: available.getPropsCopy().available,
    };
  }
}
