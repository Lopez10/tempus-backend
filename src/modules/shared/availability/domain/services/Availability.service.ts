import { Time } from '@common';

export interface AvailabilityServiceProps {
  hour: Time;
  available: number;
}

export interface timeAndPeopleOfBookings {
  start: Time;
  end: Time;
  people: number;
}

export class AvailabilityService {
  calculateAvailableHours({
    timeAndPeopleOfBookings,
    maxCapacity,
    interval,
    startTime,
    endTime,
  }: {
    timeAndPeopleOfBookings: timeAndPeopleOfBookings[];
    maxCapacity: number;
    interval: number;
    startTime: Time;
    endTime: Time;
  }): AvailabilityServiceProps[] {
    // TODO: calculate available hours based on the bookings of the day substrating the max capacity of the area
    // TODO: Add the rest of the time between the start and end times of the area

    return [];
  }
}
