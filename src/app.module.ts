import {
  RestaurantModule,
  AreaModule,
  BookingModule,
  AvailableModule,
} from '@modules';
import { Module } from '@nestjs/common';

@Module({
  imports: [RestaurantModule, AvailableModule, AreaModule, BookingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
