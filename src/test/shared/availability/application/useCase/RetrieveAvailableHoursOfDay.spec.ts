import {
  AvailabilityService,
  RetrieveAvailableHoursOfDayUseCase,
} from '@modules';
import { MockAreaRepository } from '../../../../area/MockAreaRepository';
import { MockBookingRepository } from '../../../../booking/MockBookingRepository';
import { mockAreaData } from '../../../../area/mockAreaData';
import {
  mockMultipleBookingData,
  mockSimpleBookingData,
} from '../../../../booking/mockBookingData';

describe('Retrieve Available Hours Of Day Use Case', () => {
  const areaRepository = new MockAreaRepository();
  const availabilityService = new AvailabilityService();
  const bookingRepository = new MockBookingRepository();

  const action = new RetrieveAvailableHoursOfDayUseCase(
    bookingRepository,
    areaRepository,
    availabilityService,
  );

  afterEach(async () => {
    bookingRepository.clear();
    areaRepository.clear();
  });

  it(`
    GIVEN an area data of restaurant
    AND a booking to this area
    WHEN I retrieve the available hours of the day
    THEN the available hours of the day should be retrieved correctly
  `, async () => {
    await mockAreaData(areaRepository);
    await mockSimpleBookingData(bookingRepository);

    // GIVEN
    const retrieveAvailableHoursOfDayDTO = {
      day: '01/01/2024',
      areaId: 'Area_1',
    };

    // WHEN
    const hoursAvailable = await action.run(retrieveAvailableHoursOfDayDTO);

    // THEN
    expect(hoursAvailable).toEqual([
      {
        hour: '10:00',
        available: 10,
      },
      {
        hour: '10:30',
        available: 7,
      },
      {
        hour: '11:00',
        available: 7,
      },
      {
        hour: '11:30',
        available: 7,
      },
      {
        hour: '12:00',
        available: 10,
      },
      {
        hour: '12:30',
        available: 10,
      },
      {
        hour: '13:00',
        available: 10,
      },
      {
        hour: '13:30',
        available: 10,
      },
      {
        hour: '14:00',
        available: 10,
      },
      {
        hour: '14:30',
        available: 10,
      },
      {
        hour: '15:00',
        available: 10,
      },
    ]);
  });

  it(`
    GIVEN an area data of restaurant
    AND there are not bookings to this area and this day
    WHEN I call to the use case to retrieve the available hours of the day
    THEN the available hours of the day should be retrieved
  `, async () => {
    await mockAreaData(areaRepository);

    // GIVEN
    const retrieveAvailableHoursOfDayDTO = {
      day: '01/01/2024',
      areaId: 'Area_1',
    };

    // WHEN
    const hoursAvailable = await action.run(retrieveAvailableHoursOfDayDTO);

    // THEN
    expect(hoursAvailable).toEqual([
      {
        hour: '10:00',
        available: 10,
      },
      {
        hour: '10:30',
        available: 10,
      },
      {
        hour: '11:00',
        available: 10,
      },
      {
        hour: '11:30',
        available: 10,
      },
      {
        hour: '12:00',
        available: 10,
      },
      {
        hour: '12:30',
        available: 10,
      },
      {
        hour: '13:00',
        available: 10,
      },
      {
        hour: '13:30',
        available: 10,
      },
      {
        hour: '14:00',
        available: 10,
      },
      {
        hour: '14:30',
        available: 10,
      },
      {
        hour: '15:00',
        available: 10,
      },
    ]);
  });

  it(`
    GIVEN an area data of restaurant
    AND there are some bookings to this area and this day
    WHEN I retrieve the available hours of the day
    THEN the available hours of the day should be retrieved correctly
  `, async () => {
    await mockAreaData(areaRepository);
    await mockMultipleBookingData(bookingRepository);

    // GIVEN
    const retrieveAvailableHoursOfDayDTO = {
      day: '01/01/2024',
      areaId: 'Area_2',
    };

    // WHEN
    const hoursAvailable = await action.run(retrieveAvailableHoursOfDayDTO);

    // THEN
    expect(hoursAvailable).toEqual([
      {
        hour: '12:00',
        available: 10,
      },
      {
        hour: '12:15',
        available: 10,
      },
      {
        hour: '12:30',
        available: 10,
      },
      {
        hour: '12:45',
        available: 7,
      },
      {
        hour: '13:00',
        available: 4,
      },
      {
        hour: '13:15',
        available: 4,
      },
      {
        hour: '13:30',
        available: 4,
      },
      {
        hour: '13:45',
        available: 4,
      },
      {
        hour: '14:00',
        available: 4,
      },
      {
        hour: '14:15',
        available: 4,
      },
      {
        hour: '14:30',
        available: 4,
      },
      {
        hour: '14:45',
        available: 7,
      },
      {
        hour: '15:00',
        available: 7,
      },
    ]);
  });
});
