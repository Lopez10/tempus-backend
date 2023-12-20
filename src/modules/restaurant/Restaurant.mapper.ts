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
      id: restaurant.getPropsCopy().id.value,
      name: restaurant.getPropsCopy().name.value,
      email: restaurant.getPropsCopy().email.value,
      description: restaurant.getPropsCopy().description.value,
      capacity: restaurant.getPropsCopy().capacity,
    };
  }
}
