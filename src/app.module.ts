import { Module } from '@nestjs/common';
import { RestaurantModule } from './modules/restaurant/Restaurant.module';
import { AvailableModule } from './modules/available/Available.module';
import { AreaModule } from './modules/area/Area.module';

@Module({
  imports: [RestaurantModule, AvailableModule, AreaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
