import { Module } from '@nestjs/common';
import { BookingController } from './http';
import { BookingPostgresRepository } from './infrastructure';
import { RetrieveBookingUseCase, RetrieveBookingsUseCase } from './application';
import { BookingRepository } from './domain';

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
})
export class BookingModule {}
