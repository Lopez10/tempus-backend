import { DateVO, Time } from '@common';

export interface AvailabilityScheduleProps {
  hour: Time;
  available: number;
}

export interface AvailabilityCalendarProps {
  day: DateVO;
  available: boolean;
}

export interface timeAndPeopleOfBooking {
  start: Time;
  end: Time;
  people: number;
  day?: DateVO;
}

export class AvailabilityService {
  calculateAvailableDays({
    timeAndPeopleOfBookings,
    date,
    open,
    close,
    interval,
    maxCapacity,
  }: {
    timeAndPeopleOfBookings: timeAndPeopleOfBooking[];
    date: DateVO;
    maxCapacity: number;
    interval: number;
    open: Time;
    close: Time;
  }): string[] {
    const availability: string[] = [];

    const daysOfMonth = date.daysOfMonth;

    daysOfMonth.forEach((day) => {
      const hoursAndAvailability = this.calculateAvailableHoursOfDay({
        day,
        timeAndPeopleOfBookings,
        maxCapacity,
        interval,
        open,
        close,
      });
      const availabilityForDay = hoursAndAvailability.some(
        (available) => available.available > 0,
      );

      if (!availabilityForDay) {
        return;
      }

      availability.push(day.value);
    });

    return availability;
  }

  calculateAvailableHoursOfDay({
    timeAndPeopleOfBookings,
    day,
    maxCapacity,
    interval,
    open,
    close,
  }: {
    timeAndPeopleOfBookings: timeAndPeopleOfBooking[];
    day: DateVO;
    maxCapacity: number;
    interval: number;
    open: Time;
    close: Time;
  }): AvailabilityScheduleProps[] {
    timeAndPeopleOfBookings = timeAndPeopleOfBookings.filter((booking) =>
      booking.day?.matches(day),
    );

    const hoursAndAvailability = this.calculateAvailableHours({
      timeAndPeopleOfBookings,
      maxCapacity,
      interval,
      open,
      close,
    });

    return hoursAndAvailability;
  }

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
  }): AvailabilityScheduleProps[] {
    const intervals = this.generateIntervals(open, close, interval);

    const availability: AvailabilityScheduleProps[] = intervals.map(
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
    hoursAndAvailability: AvailabilityScheduleProps[];
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
  ): number {
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

  private isOverlap(
    interval: Time,
    bookingStart: Time,
    bookingEnd: Time,
  ): boolean {
    return (
      interval.isAfterOrEqual(bookingStart) && interval.isBefore(bookingEnd)
    );
  }
}
