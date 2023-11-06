import { Description, Email, ID, Name } from '@common';
import { Restaurant } from './domain/Restaurant.entity';

export interface RestaurantDTO {
  id: string;
  name: string;
  email: string;
  description: string;
}
export class RestaurantMapper {
  static toDomain(restaurantDTO: RestaurantDTO): Restaurant {
    return Restaurant.create(
      {
        name: new Name(restaurantDTO.name),
        email: new Email(restaurantDTO.email),
        description: new Description(restaurantDTO.description),
      },
      new ID(restaurantDTO.id),
    );
  }

  static toDTO(restaurant: Restaurant): RestaurantDTO {
    return {
      id: restaurant.id.value,
      name: restaurant.getPropsCopy().name.value,
      email: restaurant.getPropsCopy().email.value,
      description: restaurant.getPropsCopy().description.value,
    };
  }
}
