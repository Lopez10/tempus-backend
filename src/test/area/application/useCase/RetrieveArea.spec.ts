import { Name, Time, ID } from '@common';
import { RetrieveAreaUseCase, AreaRepositoryPort, Area } from '@modules';
import { MockAreaRepository } from '../../MockAreaRepository';

describe('Retrieve Area Use Case', () => {
  it(`
      GIVEN an existing area
      WHEN the area is retrieved by id
      THEN the area should be returned
    `, async () => {
    const areaReposistory: AreaRepositoryPort = new MockAreaRepository();
    mockAreaData(areaReposistory);
    const action = new RetrieveAreaUseCase(areaReposistory);

    // GIVEN
    const areaRequestData = {
      id: 'Area_1',
    };

    // WHEN
    const areaRetrieved = await action.run(areaRequestData);

    // THEN
    expect(areaRetrieved.id).toEqual('Area_1');
  });

  it(`
      GIVEN an non existing area
      WHEN the area is retrieved by id
      THEN an error should be thrown
  `, async () => {
    const areaReposistory: AreaRepositoryPort = new MockAreaRepository();
    mockAreaData(areaReposistory);
    const action = new RetrieveAreaUseCase(areaReposistory);

    // GIVEN
    const areaRequestData = {
      id: 'Area_10',
    };

    // WHEN
    const areaRetrieved = action.run(areaRequestData);

    // THEN
    await expect(areaRetrieved).rejects.toThrowError('Error: Area not found');
  });
});

async function mockAreaData(areaReposistory: AreaRepositoryPort) {
  return await areaReposistory.insert(
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
  );
}
