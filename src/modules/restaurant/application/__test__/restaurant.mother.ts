import { Restaurant, RestaurantDto, RestaurantMapper } from '@modules';

export class RestaurantMother {
  static create(params: Partial<RestaurantDto>): Restaurant {
    const restaurantDto = {
      id: 'restaurantId',
      name: 'Restaurant 1',
      description: 'Restaurant 1',
      email: 'restaurant@mock.com',
      capacity: 10,
      ...params,
    };

    return RestaurantMapper.toDomain(restaurantDto);
  }
}
