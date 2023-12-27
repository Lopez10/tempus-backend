import { ID, Name, Time } from '@common';
import { AreaRepositoryPort, Area } from '@modules';

export async function mockAreaData(areaReposistory: AreaRepositoryPort) {
  return await areaReposistory.insertSome([
    Area.create(
      {
        name: new Name('Area_1_Name'),
        maxCapacity: 10,
        hoursPerReservation: 1,
        open: new Time('10:00'),
        close: new Time('15:00'),
        interval: 30,
        restaurantId: new ID('Restaurant_1'),
      },
      new ID('Area_1'),
    ),
    Area.create(
      {
        name: new Name('Area_2_Name'),
        maxCapacity: 10,
        hoursPerReservation: 2,
        open: new Time('12:00'),
        close: new Time('15:00'),
        interval: 15,
        restaurantId: new ID('Restaurant_2'),
      },
      new ID('Area_2'),
    ),
  ]);
}
