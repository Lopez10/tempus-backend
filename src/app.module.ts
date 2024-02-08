import {
  RestaurantModule,
  AreaModule,
  BookingModule,
  AvailabilityModule,
} from '@modules';
import { Module } from '@nestjs/common';

@Module({
  imports: [RestaurantModule, AreaModule, BookingModule, AvailabilityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
