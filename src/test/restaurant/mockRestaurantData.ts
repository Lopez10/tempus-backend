import { Name, ID, Description, Email } from '@common';
import { RestaurantRepositoryPort, Restaurant } from '@modules';

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
