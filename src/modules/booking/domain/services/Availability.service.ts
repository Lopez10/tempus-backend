import { DateTime } from '@common';
import { Booking } from '../Booking.entity';

export interface AvailabilityServiceProps {
  hour: DateTime;
  available: number;
}

export class AvailabilityService {
  calculateAvailableHours(bookings: Booking[]): AvailabilityServiceProps[] {
    const hoursAndAvailable: { start: DateTime; people: number }[] =
      bookings.map((booking) => {
        return {
          start: booking.getPropsCopy().start,
          people: booking.getPropsCopy().people,
        };
      });

    // TODO: calculate available hours based on the bookings of the day substrating the max capacity of the area
    // TODO: Add the rest of the time between the start and end times of the area

    return [];
  }
}
