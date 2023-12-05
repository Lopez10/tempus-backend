import { Name, ID } from '@common';
import { Area } from '../../../../modules/area/domain/Area.entity';
import { RetrieveAreasByRestaurantIdUseCase } from '../../../../modules/area/application/UseCases/RetrieveAreasByRestaurantId/RetrieveAreasByRestaurantId.useCase';
import { AreaRepositoryPort } from '../../../../modules/area/domain/Area.repository.port';
import { MockAreaRepository } from '../../MockAreaRepository';

describe('Retrieve Areas by restaurant Id Use Case', () => {
  it(`
        GIVEN there are many areas 
        WHEN the areas are retrieved by restaurant Id
        THEN the areas with the restaurant id should be returned
    `, async () => {
    const areaReposistory: AreaRepositoryPort = new MockAreaRepository();
    const action = new RetrieveAreasByRestaurantIdUseCase(areaReposistory);
    mockAreaData(areaReposistory);

    // GIVEN
    const areaRequestData = {
      restaurantId: 'Restaurant_1',
    };

    // WHEN
    const areas = await action.run(areaRequestData);

    // THEN
    expect(areas.length).toEqual(1);
    expect(areas[0].name).toEqual('Area_1');
  });
});

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
