import { Area } from '../../modules/area/domain/Area.entity';
import { ID, Name } from '@common';
import { AreaRepositoryPort } from '../../modules/area/domain/Area.repository.port';

export async function mockAreaData(areaReposistory: AreaRepositoryPort) {
  return await areaReposistory.insertSome([
    Area.create(
      {
        name: new Name('Area_1'),
        maxCapacity: 10,
        hoursPerReservation: 1,
        restaurantId: new ID('Restaurant_1'),
      },
      new ID('Area_1'),
    ),
    Area.create(
      {
        name: new Name('Area_2'),
        maxCapacity: 10,
        hoursPerReservation: 1,
        restaurantId: new ID('Restaurant_2'),
      },
      new ID('Area_2'),
    ),
  ]);
}
