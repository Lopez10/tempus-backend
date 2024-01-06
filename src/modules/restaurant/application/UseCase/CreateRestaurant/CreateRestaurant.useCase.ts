import { Inject, Injectable } from '@nestjs/common';
import { Restaurant, RestaurantProps } from '../../../domain/Restaurant.entity';
import {
  RestaurantRepository,
  RestaurantRepositoryPort,
} from '../../../domain/Restaurant.respository.port';
import { Description, Email, Name, UseCase } from '@common';
import { CreateRestaurantDto } from './CreateRestaurant.dto';

@Injectable()
export class CreateRestaurantUseCase
  implements UseCase<CreateRestaurantDto, Restaurant>
{
  constructor(
    @Inject(RestaurantRepository)
    private readonly repository: RestaurantRepositoryPort,
  ) {}

  async run(restaurantDTO: CreateRestaurantDto): Promise<Restaurant> {
    const restaurantProps: RestaurantProps = {
      name: new Name(restaurantDTO.name),
      email: new Email(restaurantDTO.email),
      description: new Description(restaurantDTO.description),
      capacity: restaurantDTO.capacity,
    };
    const restaurant = Restaurant.create(restaurantProps);
    await this.repository.insert(restaurant);

    return restaurant;
  }
}
