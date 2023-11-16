import { Inject, Injectable } from '@nestjs/common';
import { Restaurant, RestaurantProps } from '../../../domain/Restaurant.entity';
import {
  RestaurantRepository,
  RestaurantRepositoryPort,
} from '../../../domain/Restaurant.respository.port';
import { Description, Email, Name, UseCase } from '@common';

export interface CreateRestaurantDTO {
  name: string;
  email: string;
  description: string;
}

@Injectable()
export class CreateRestaurant
  implements UseCase<CreateRestaurantDTO, Restaurant>
{
  constructor(
    @Inject(RestaurantRepository)
    private readonly repository: RestaurantRepositoryPort,
  ) {}

  async run(restaurantDTO: CreateRestaurantDTO): Promise<Restaurant> {
    const restaurantProps: RestaurantProps = {
      name: new Name(restaurantDTO.name),
      email: new Email(restaurantDTO.email),
      description: new Description(restaurantDTO.description),
    };
    const restaurant = Restaurant.create(restaurantProps);
    await this.repository.insert(restaurant);

    return restaurant;
  }
}
