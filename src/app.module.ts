import { Module } from '@nestjs/common';
import { RestaurantModule } from './modules/restaurant/Restaurant.module';

@Module({
  imports: [RestaurantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
