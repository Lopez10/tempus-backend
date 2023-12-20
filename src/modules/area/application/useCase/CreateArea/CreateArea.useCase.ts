import { UseCase, Name, ID } from '@common';
import { Injectable, Inject } from '@nestjs/common';

import { CreateAreaDTO } from './CreateAreaDTO';
import {
  AreaRepository,
  AreaRepositoryPort,
  AreaProps,
  Area,
} from '@modules/area/domain';

@Injectable()
export class CreateAreaUseCase implements UseCase<CreateAreaDTO, Area> {
  constructor(
    @Inject(AreaRepository)
    private readonly repository: AreaRepositoryPort,
  ) {}

  async run(areaDTO: CreateAreaDTO): Promise<Area> {
    const areaProps: AreaProps = {
      name: new Name(areaDTO.name),
      maxCapacity: areaDTO.maxCapacity,
      hoursPerReservation: areaDTO.hoursPerReservation,
      restaurantId: new ID(areaDTO.restaurantId),
    };
    const area = Area.create(areaProps);
    await this.repository.insert(area);

    return area;
  }
}
