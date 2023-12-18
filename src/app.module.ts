import {
  RestaurantModule,
  AreaModule,
  BookModule,
  AvailableModule,
} from '@modules';
import { Module } from '@nestjs/common';

@Module({
  imports: [RestaurantModule, AvailableModule, AreaModule, BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
