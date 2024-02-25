import { AreaDto, AreaMapper } from '@modules/area/Area.mapper';
import { Area } from '@modules/area/domain';

export class AreaMother {
  static create(params: Partial<AreaDto>): Area {
    const areaDto = {
      id: 'areaId',
      name: 'Area 1',
      maxCapacity: 10,
      hoursPerReservation: 2,
      open: '08:00',
      close: '22:00',
      interval: 30,
      restaurantId: 'restaurantId',
      ...params,
    };

    return AreaMapper.toDomain(areaDto);
  }
}
