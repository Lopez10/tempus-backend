import { RestaurantModule, AreaModule, BookingModule } from '@modules';
import { Module } from '@nestjs/common';

@Module({
  imports: [RestaurantModule, AreaModule, BookingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
