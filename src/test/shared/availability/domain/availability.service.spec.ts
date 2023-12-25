import { Time } from '@common';
import {
  AvailabilityService,
  AvailabilityServiceProps,
  timeAndPeopleOfBookings,
} from '@modules';

describe('Availability Service test', () => {
  it(`
    GIVEN an area data and some bookings data
    WHEN I check for availability
    THEN I should get the availability of the area
    `, () => {
    // GIVEN
    const availabilityService = new AvailabilityService();
    const maxCapacity = 10;
    const interval = 15;
    const startTime = new Time('12:00');
    const endTime = new Time('16:00');
    const bookings: timeAndPeopleOfBookings[] = [
      {
        start: new Time('12:00'),
        end: new Time('14:00'),
        people: 2,
      },
      {
        start: new Time('12:15'),
        end: new Time('14:15'),
        people: 4,
      },
      {
        start: new Time('13:00'),
        end: new Time('15:00'),
        people: 3,
      },
    ];

    // WHEN
    const availability = availabilityService.calculateAvailableHours({
      timeAndPeopleOfBookings: bookings,
      maxCapacity,
      interval,
      startTime,
      endTime,
    });

    // THEN
    const expectedAvailability = {
      '12:15': 8,
      '12:30': 4,
    };

    checkAvailability(availability, expectedAvailability);
  });
});

function checkAvailability(
  availability: AvailabilityServiceProps[],
  expectedAvailability: { [key: string]: number },
) {
  availability.forEach((availableHour) => {
    if (expectedAvailability.hasOwnProperty(availableHour.hour.value)) {
      expect(availableHour.available).toBe(
        expectedAvailability[availableHour.hour.value],
      );
    }
  });
}
