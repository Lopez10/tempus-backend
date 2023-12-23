import { UseCase, Name, ID, Time } from '@common';
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

  async run(createAreaDTO: CreateAreaDTO): Promise<Area> {
    const areaProps: AreaProps = {
      name: new Name(createAreaDTO.name),
      maxCapacity: createAreaDTO.maxCapacity,
      hoursPerReservation: createAreaDTO.hoursPerReservation,
      open: new Time(createAreaDTO.open),
      close: new Time(createAreaDTO.close),
      interval: createAreaDTO.interval,
      restaurantId: new ID(createAreaDTO.restaurantId),
    };
    const area = Area.create(areaProps);
    await this.repository.insert(area);

    return area;
  }
}
