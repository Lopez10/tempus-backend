import {
  Restaurant,
  RestaurantRepositoryPort,
  RetrieveRestaurantsUseCase,
} from '@modules';
import { MockRestaurantRepository } from '../../MockRestaurantRepository';
import { Description, Email, ID, Name, PaginationQueryParams } from '@common';

describe('Retrieve Restaurants Use Case', () => {
  it(`
        GIVEN there are many restaurants
        WHEN the restaurants are retrieved
        THEN the restaurant should be retrieved 
    `, async () => {
    const restaurantReposistory: RestaurantRepositoryPort =
      new MockRestaurantRepository();
    const action = new RetrieveRestaurantsUseCase(restaurantReposistory);

    // GIVEN
    mockRestaurantData(restaurantReposistory);
    const pagination: PaginationQueryParams = {
      limit: 10,
      offset: 0,
      page: 0,
      orderBy: { field: 'name', param: 'asc' },
    };
    const restaurantRequestData = {
      criteria: {},
      pagination,
    };

    // WHEN
    const restaurantsRetrieved = await action.run(restaurantRequestData);

    // THEN
    expect(restaurantsRetrieved.length).toEqual(2);
  });
});

export async function mockRestaurantData(
  restaurantRepository: RestaurantRepositoryPort,
) {
  return await restaurantRepository.insertSome([
    Restaurant.create(
      {
        name: new Name('Restaurant_1'),
        description: new Description('Restaurant_1'),
        email: new Email('restaurant1@gmail.com'),
        capacity: 10,
      },
      new ID('Restaurant_1'),
    ),
    Restaurant.create(
      {
        name: new Name('Restaurant_2'),
        description: new Description('Restaurant_2'),
        email: new Email('restaurant2@gmail.com'),
        capacity: 10,
      },
      new ID('Restaurant_2'),
    ),
  ]);
}
