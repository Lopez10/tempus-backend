import { DateTime } from '@common';
import { Booking } from '../Booking.entity';

export interface AvailabilityServiceProps {
  hour: DateTime;
  available: number;
}

export class AvailabilityService {
  calculateAvailableHours(bookings: Booking[]): AvailabilityServiceProps[] {
    return [];
  }
}
