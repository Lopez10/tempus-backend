import { RestaurantRepositoryPort } from '../../../../modules/restaurant/domain/Restaurant.respository.port';
import { MockRestaurantRepository } from '../../MockRestaurantRepository';
import { RetrieveRestaurantsUseCase } from '../../../../modules/restaurant/application/UseCase/RetrieveRestaurants/RetrieveRestaurants.useCase';
import { Description, Email, ID, Name, PaginationQueryParams } from '@common';
import { Restaurant } from '../../../../modules/restaurant/domain/Restaurant.entity';

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
      },
      new ID('Restaurant_1'),
    ),
    Restaurant.create(
      {
        name: new Name('Restaurant_2'),
        description: new Description('Restaurant_2'),
        email: new Email('restaurant2@gmail.com'),
      },
      new ID('Restaurant_2'),
    ),
  ]);
}
