import { Inject, Injectable } from '@nestjs/common';
import { Restaurant, RestaurantProps } from '../../../domain/Restaurant.entity';
import {
  RestaurantRepository,
  RestaurantRepositoryPort,
} from '../../../domain/Restaurant.respository.port';
import { Description, Email, Name, UseCase } from '@common';
import { CreateRestaurantDTO } from './CreateRestaurantDTO';

@Injectable()
export class CreateRestaurantUseCase
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
