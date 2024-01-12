import { Time } from '@common';

export interface AvailabilityServiceProps {
  hour: Time;
  available: number;
}

export interface timeAndPeopleOfBooking {
  start: Time;
  end: Time;
  people: number;
}

export class AvailabilityService {
  calculateAvailableHours({
    timeAndPeopleOfBookings,
    maxCapacity,
    interval,
    open,
    close,
  }: {
    timeAndPeopleOfBookings: timeAndPeopleOfBooking[];
    maxCapacity: number;
    interval: number;
    open: Time;
    close: Time;
  }): AvailabilityServiceProps[] {
    const intervals = this.generateIntervals(open, close, interval);

    const availability: AvailabilityServiceProps[] = intervals.map(
      (interval) => {
        const capacityUsed = this.calculateCapacityUsed(
          timeAndPeopleOfBookings,
          interval,
        );

        const availableCapacity = maxCapacity - capacityUsed;

        if (availableCapacity < 0) {
          throw new Error('Capacity exceeded');
        }

        return {
          hour: interval,
          available: Math.max(0, availableCapacity),
        };
      },
    );

    return availability;
  }

  checkAvailabilityForHours({
    timeAndPeopleOfBooking,
    hoursAndAvailability,
  }: {
    timeAndPeopleOfBooking: timeAndPeopleOfBooking;
    hoursAndAvailability: AvailabilityServiceProps[];
  }): boolean {
    hoursAndAvailability.forEach((available) => {
      if (
        this.isOverlap(
          available.hour,
          timeAndPeopleOfBooking.start,
          timeAndPeopleOfBooking.end,
        ) &&
        available.available < timeAndPeopleOfBooking.people
      ) {
        return false;
      }
    });

    return true;
  }

  private calculateCapacityUsed(
    timeAndPeopleOfBookings: timeAndPeopleOfBooking[],
    interval: Time,
  ) {
    return timeAndPeopleOfBookings.reduce((totalCapacity, booking) => {
      if (this.isOverlap(interval, booking.start, booking.end)) {
        return totalCapacity + booking.people;
      }
      return totalCapacity;
    }, 0);
  }

  private generateIntervals(
    startTime: Time,
    endTime: Time,
    interval: number,
  ): Time[] {
    const intervals: Time[] = [];
    let currentTime = startTime;

    while (currentTime.isBeforeOrEqual(endTime)) {
      intervals.push(currentTime);
      currentTime = currentTime.addMinutes(interval);
    }

    return intervals;
  }

  private isOverlap(interval: Time, startTime: Time, endTime: Time): boolean {
    return interval.isAfter(startTime) && interval.isBefore(endTime);
  }
}
