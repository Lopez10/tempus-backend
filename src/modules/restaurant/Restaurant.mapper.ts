import { Description, Email, ID, Name } from '@common';
import { Restaurant } from './domain';

export interface RestaurantDTO {
  id: string;
  name: string;
  email: string;
  description: string;
  capacity: number;
}
export class RestaurantMapper {
  static toDomain(restaurantDTO: RestaurantDTO): Restaurant {
    return Restaurant.create(
      {
        name: new Name(restaurantDTO.name),
        email: new Email(restaurantDTO.email),
        description: new Description(restaurantDTO.description),
        capacity: restaurantDTO.capacity,
      },
      new ID(restaurantDTO.id),
    );
  }

  static toDTO(restaurant: Restaurant): RestaurantDTO {
    return {
      id: restaurant.propsCopy.id.value,
      name: restaurant.propsCopy.name.value,
      email: restaurant.propsCopy.email.value,
      description: restaurant.propsCopy.description.value,
      capacity: restaurant.propsCopy.capacity,
    };
  }
}
