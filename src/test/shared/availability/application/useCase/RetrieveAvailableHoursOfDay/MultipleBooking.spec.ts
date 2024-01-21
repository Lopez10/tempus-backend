import { DateVO, ID, Name, Time } from '@common';
import {
  Area,
  AreaRepositoryPort,
  Booking,
  BookingRepositoryPort,
  RetrieveAvailableHoursOfDayUseCase,
} from '@modules';
import { MockAreaRepository } from '../../../../../area/MockAreaRepository';
import { MockBookingRepository } from '../../../../../booking/MockBookingRepository';

describe('Retrieve Available Hours Of Day Use Case', () => {
  const areaRepository = new MockAreaRepository();
  const bookingRepository = new MockBookingRepository();

  const action = new RetrieveAvailableHoursOfDayUseCase(
    bookingRepository,
    areaRepository,
  );

  afterEach(async () => {
    bookingRepository.clear();
    areaRepository.clear();
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
      restaurantId: 'Restaurant_2',
    };

    // WHEN
    const hoursAvailable = await action.run(retrieveAvailableHoursOfDayDTO);

    // THEN
    expect(hoursAvailable).toEqual([
      {
        areaId: 'Area_2',
        availability: [
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
            available: 7,
          },
          {
            hour: '12:45',
            available: 4,
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
            available: 1,
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
        ],
      },
    ]);
  });
});

async function mockAreaData(areaReposistory: AreaRepositoryPort) {
  return await areaReposistory.insert(
    Area.create(
      {
        name: new Name('Area_2_Name'),
        maxCapacity: 10,
        hoursPerReservation: 2,
        open: new Time('12:00'),
        close: new Time('15:00'),
        interval: 15,
        restaurantId: new ID('Restaurant_2'),
      },
      new ID('Area_2'),
    ),
  );
}

async function mockMultipleBookingData(
  bookingRepository: BookingRepositoryPort,
) {
  return await bookingRepository.insertSome([
    Booking.create(
      {
        clientId: new ID('Client_1'),
        tableId: new ID('Table_1'),
        day: new DateVO('01/01/2024'),
        start: new Time('12:45'),
        end: new Time('14:45'),
        people: 3,
        areaId: new ID('Area_2'),
      },
      new ID('Booking_1'),
    ),
    Booking.create(
      {
        clientId: new ID('Client_2'),
        tableId: new ID('Table_2'),
        day: new DateVO('01/01/2024'),
        start: new Time('12:30'),
        end: new Time('14:30'),
        people: 3,
        areaId: new ID('Area_2'),
      },
      new ID('Booking_2'),
    ),
    Booking.create(
      {
        clientId: new ID('Client_3'),
        tableId: new ID('Table_3'),
        day: new DateVO('01/01/2024'),
        start: new Time('14:15'),
        end: new Time('16:15'),
        people: 3,
        areaId: new ID('Area_2'),
      },
      new ID('Booking_3'),
    ),
  ]);
}
