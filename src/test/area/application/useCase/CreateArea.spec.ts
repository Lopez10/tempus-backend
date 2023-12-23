import { CreateAreaUseCase, AreaRepositoryPort } from '@modules';
import { MockAreaRepository } from '../../MockAreaRepository';

describe('Create Area Use Case', () => {
  it(`
        GIVEN an area data
        WHEN I call to the use case to create an area
        THEN the area should be created with the correct data
    `, async () => {
    const areaReposistory: AreaRepositoryPort = new MockAreaRepository();
    const action = new CreateAreaUseCase(areaReposistory);

    // GIVEN
    const areaRequestData = {
      name: 'Area 1',
      maxCapacity: 10,
      hoursPerReservation: 2,
      open: '10:00',
      close: '22:00',
      interval: 30,
      restaurantId: 'Restaurant_1',
    };

    // WHEN
    const areaCreated = await action.run(areaRequestData);

    // THEN
    expect(areaCreated.getPropsCopy().name.value).toEqual('Area 1');
    expect(areaCreated.getPropsCopy().maxCapacity).toEqual(10);
    expect(areaCreated.getPropsCopy().hoursPerReservation).toEqual(2);
    expect(areaCreated.getPropsCopy().restaurantId.value).toEqual(
      'Restaurant_1',
    );
  });

  it(`
        GIVEN an area data with invalid name
        WHEN I call to the use case to create an area
        THEN the area should not be created
    `, async () => {
    const areaReposistory: AreaRepositoryPort = new MockAreaRepository();
    const action = new CreateAreaUseCase(areaReposistory);

    // GIVEN
    const areaRequestData = {
      name: '',
      maxCapacity: 10,
      hoursPerReservation: 2,
      open: '10:00',
      close: '22:00',
      interval: 30,
      restaurantId: 'Restaurant_1',
    };
    // WHEN
    const areaCreated = action.run(areaRequestData);

    // THEN
    await expect(areaCreated).rejects.toThrowError('Name "" is too short');
  });
});
