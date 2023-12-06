import {
  CreateRestaurantDTO,
  CreateRestaurantUseCase,
  RestaurantRepositoryPort,
} from '@modules';
import { MockRestaurantRepository } from '../../MockRestaurantRepository';

describe('Create Restaurant Use Case', () => {
  it(`
        GIVEN a restaurant data
        WHEN I call to the use case to create a restaurant
        THEN the restaurant should be created with the correct data
    `, async () => {
    const restaurantReposistory: RestaurantRepositoryPort =
      new MockRestaurantRepository();
    const action = new CreateRestaurantUseCase(restaurantReposistory);

    // GIVEN
    const restaurantRequestData: CreateRestaurantDTO = {
      name: 'Restaurant 1',
      description: 'Restaurant 1 description',
      email: 'restaurant1@gmail.com',
    };

    // WHEN
    const restaurantCreated = await action.run(restaurantRequestData);

    // THEN
    expect(restaurantCreated.getPropsCopy().name.value).toEqual('Restaurant 1');
    expect(restaurantCreated.getPropsCopy().description.value).toEqual(
      'Restaurant 1 description',
    );
    expect(restaurantCreated.getPropsCopy().email.value).toEqual(
      'restaurant1@gmail.com',
    );
  });
});
