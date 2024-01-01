import { RestaurantModule, AreaModule, BookingModule } from '@modules';
import { AvailabilityModule } from '@modules/shared/availability/Availability.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [RestaurantModule, AreaModule, BookingModule, AvailabilityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
