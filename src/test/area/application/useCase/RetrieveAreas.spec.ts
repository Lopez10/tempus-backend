import { ID, Name, PaginationQueryParams, Time } from '@common';
import { MockAreaRepository } from '../../MockAreaRepository';
import {
  Area,
  AreaRepositoryPort,
  RetrieveAreasDto,
  RetrieveAreasUseCase,
} from '@modules';

describe('Retrieve Areas Use Case', () => {
  it(`
        GIVEN there are many areas 
        WHEN the areas are retrieved
        THEN the areas should be retrieved
    `, async () => {
    const areaReposistory: AreaRepositoryPort = new MockAreaRepository();
    const action = new RetrieveAreasUseCase(areaReposistory);

    // GIVEN
    mockAreaData(areaReposistory);
    const pagination: PaginationQueryParams = {
      limit: 10,
      offset: 0,
      page: 0,
      orderBy: { field: 'name', param: 'asc' },
    };
    const areaRequestData: RetrieveAreasDto = {
      criteria: {},
      pagination,
    };

    // WHEN
    const areasRetrieved = await action.run(areaRequestData);

    // THEN
    expect(areasRetrieved.length).toEqual(2);
  });
});

async function mockAreaData(areaReposistory: AreaRepositoryPort) {
  return await areaReposistory.insertSome([
    Area.create(
      {
        name: new Name('Area_1'),
        maxCapacity: 10,
        hoursPerReservation: 1,
        open: new Time('10:00'),
        close: new Time('22:00'),
        interval: 30,
        restaurantId: new ID('Restaurant_1'),
      },
      new ID('Area_1'),
    ),
    Area.create(
      {
        name: new Name('Area_2'),
        maxCapacity: 10,
        hoursPerReservation: 1,
        open: new Time('10:00'),
        close: new Time('22:00'),
        interval: 30,
        restaurantId: new ID('Restaurant_2'),
      },
      new ID('Area_2'),
    ),
  ]);
}
