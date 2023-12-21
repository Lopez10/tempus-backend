import { DateTime } from '@common';

export interface AvailabilityServiceProps {
  hour: DateTime;
  available: number;
}

export interface StartAndPeopleOfBookings {
  start: DateTime;
  people: number;
}

export class AvailabilityService {
  calculateAvailableHours(
    startAndPeopleOfBookings: StartAndPeopleOfBookings[],
    maxCapacity: number,
  ): AvailabilityServiceProps[] {
    // TODO: calculate available hours based on the bookings of the day substrating the max capacity of the area
    // TODO: Add the rest of the time between the start and end times of the area

    return [];
  }
}
