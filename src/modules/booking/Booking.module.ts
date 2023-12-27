import { Module } from '@nestjs/common';
import { BookingController } from './http';
import { BookingPostgresRepository } from './infrastructure';
import { RetrieveBookingUseCase, RetrieveBookingsUseCase } from './application';
import { BookRepository } from './domain';

@Module({
  controllers: [BookingController],
  providers: [
    BookingController,
    BookingPostgresRepository,
    {
      provide: BookRepository,
      useValue: BookingPostgresRepository,
    },
    RetrieveBookingUseCase,
    RetrieveBookingsUseCase,
  ],
})
export class BookingModule {}
