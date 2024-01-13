import { ID, DateVO, Time, Name } from '@common';
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
      AND a booking to this area
      WHEN I retrieve the available hours of the day
      THEN the available hours of the day should be retrieved correctly
    `, async () => {
    await mockAreaData(areaRepository);
    await mockSimpleBookingData(bookingRepository);

    // GIVEN
    const retrieveAvailableHoursOfDayDTO = {
      day: '01/01/2024',
      restaurantId: 'Restaurant_1',
    };

    // WHEN
    const hoursAvailable = await action.run(retrieveAvailableHoursOfDayDTO);
    console.log(hoursAvailable);
    // THEN
    expect(hoursAvailable).toEqual([
      {
        areaId: 'Area_1',
        availability: [
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
        ],
      },
    ]);
  });
});

async function mockSimpleBookingData(bookingRepository: BookingRepositoryPort) {
  return await bookingRepository.insert(
    Booking.create(
      {
        clientId: new ID('Client_1'),
        tableId: new ID('Table_1'),
        day: new DateVO('01/01/2024'),
        start: new Time('10:00'),
        end: new Time('12:00'),
        people: 3,
        areaId: new ID('Area_1'),
      },
      new ID('Booking_1'),
    ),
  );
}

export async function mockAreaData(areaReposistory: AreaRepositoryPort) {
  return await areaReposistory.insert(
    Area.create(
      {
        name: new Name('Area_1_Name'),
        maxCapacity: 10,
        hoursPerReservation: 1,
        open: new Time('10:00'),
        close: new Time('15:00'),
        interval: 30,
        restaurantId: new ID('Restaurant_1'),
      },
      new ID('Area_1'),
    ),
  );
}
