import {
	RestaurantModule,
	AreaModule,
	BookingModule,
	AvailabilityModule,
} from '@modules';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV}`,
			isGlobal: true,
		}),
		RestaurantModule,
		AreaModule,
		BookingModule,
		AvailabilityModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
