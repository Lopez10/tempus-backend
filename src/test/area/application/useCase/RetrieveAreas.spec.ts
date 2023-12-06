import { ID, Name, PaginationQueryParams } from '@common';
import { AreaRepositoryPort } from '../../../../modules/area/domain/Area.repository.port';
import { MockAreaRepository } from '../../MockAreaRepository';
import { RetrieveAreasDTO } from '../../../../modules/area/application/UseCases/RetrieveAreas/RetrieveAreasDTO';
import { RetrieveAreasUseCase } from '../../../../modules/area/application/UseCases/RetrieveAreas/RetrieveAreas.useCase';
import { Area } from '../../../../modules/area/domain/Area.entity';

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
    const areaRequestData: RetrieveAreasDTO = {
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
