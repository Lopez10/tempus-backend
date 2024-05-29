import { Module } from '@nestjs/common';
import { BookingController } from './http';
import { BookingPostgresRepository } from './infrastructure';
import { RetrieveBookingUseCase, RetrieveBookingsUseCase } from './application';
import { BookingRepository } from './domain';
import { PrismaModule } from '@modules/prisma/prisma.module';

@Module({
	controllers: [BookingController],
	providers: [
		BookingController,
		BookingPostgresRepository,
		{
			provide: BookingRepository,
			useValue: BookingPostgresRepository,
		},
		RetrieveBookingUseCase,
		RetrieveBookingsUseCase,
	],
	imports: [PrismaModule],
})
export class BookingModule {}
