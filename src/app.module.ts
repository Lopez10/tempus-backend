import { Module } from '@nestjs/common';
import { RestaurantModule } from './modules/restaurant/Restaurant.module';
import { AvailableModule } from './modules/available/Available.module';

@Module({
  imports: [RestaurantModule, AvailableModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
