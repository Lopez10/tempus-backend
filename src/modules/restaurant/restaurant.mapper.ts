import { Description, Email, ID, Name } from '@common';
import { Restaurant } from './domain';

export interface RestaurantDto {
  id: string;
  name: string;
  email: string;
  description: string;
  capacity: number;
}
export class RestaurantMapper {
  static toDomain(restaurantDto: RestaurantDto): Restaurant {
    return Restaurant.create(
      {
        name: new Name(restaurantDto.name),
        email: new Email(restaurantDto.email),
        description: new Description(restaurantDto.description),
        capacity: restaurantDto.capacity,
      },
      new ID(restaurantDto.id),
    );
  }

  static toDTO(restaurant: Restaurant): RestaurantDto {
    return {
      id: restaurant.propsCopy.id.value,
      name: restaurant.propsCopy.name.value,
      email: restaurant.propsCopy.email.value,
      description: restaurant.propsCopy.description.value,
      capacity: restaurant.propsCopy.capacity,
    };
  }
}
