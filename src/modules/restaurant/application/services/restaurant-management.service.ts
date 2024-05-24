import { ID } from '@common';
import {
  AreaRepositoryPort,
  CapacityCalculationService,
  CreateAreaDto,
  RestaurantRepositoryPort,
} from '@modules';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RestaurantManagementService {
  constructor(
    private restaurantRepository: RestaurantRepositoryPort,
    private areaRepository: AreaRepositoryPort,
    private capacityCalculationService: CapacityCalculationService,
  ) {}

  async addAreaToRestaurant(createAreaDto: CreateAreaDto): Promise<void> {
    // Lógica para agregar un área a un restaurante,
    // incluyendo interactuar con los repositorios para persistir los cambios
  }

  async calculateAndUpdateCapacity(restaurantId: ID): Promise<void> {
    const restaurant = await this.restaurantRepository.findOneById(
      restaurantId,
    );
    const areas = await this.areaRepository.findByRestaurantId(restaurantId);

    const newCapacity =
      this.capacityCalculationService.calculateMaximumCapacity(
        restaurant,
        areas,
      );
    restaurant.updateCapacity(newCapacity);
    await this.restaurantRepository.update(restaurant);
  }
}
