import { Module } from '@nestjs/common';
import { AvailabilityController } from './presentation';
import {
  CreateBookingUseCase,
  RetrieveAvailableHoursOfDayUseCase,
} from './application';
import {
  AvailabilityService,
  BookingPostgresRepository,
  BookingRepository,
} from '@modules/booking';
import { AreaPostgresRepository, AreaRepository } from '@modules/area';

@Module({
  controllers: [AvailabilityController],
  providers: [
    AvailabilityController,
    BookingPostgresRepository,
    AvailabilityService,
    {
      provide: BookingRepository,
      useValue: BookingPostgresRepository,
    },
    AreaPostgresRepository,
    {
      provide: AreaRepository,
      useValue: AreaPostgresRepository,
    },
    CreateBookingUseCase,
    RetrieveAvailableHoursOfDayUseCase,
  ],
  imports: [],
  exports: [],
})
export class AvailabilityModule {}
