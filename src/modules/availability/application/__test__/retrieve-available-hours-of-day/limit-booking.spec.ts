import { Name, Time, ID, DateVO } from '@common';
import {
  AreaRepositoryPort,
  Area,
  BookingRepositoryPort,
  Booking,
  RetrieveAvailableHoursOfDayUseCase,
} from '@modules';
import { MockAreaRepository } from '@modules/area/infrastructure/area.mock.repository';
import { BookingMockRepository } from '@modules/booking/infrastructure/booking.mock.repository';

describe('Retrieve Available Hours Of Day Use Case', () => {
  const areaRepository = new MockAreaRepository();
  const bookingRepository = new BookingMockRepository();

  const action = new RetrieveAvailableHoursOfDayUseCase(
    bookingRepository,
    areaRepository,
  );

  afterEach(async () => {
    bookingRepository.clear();
    areaRepository.clear();
  });

  it(`
        GIVEN an area data of restaurant with open reservations at 13:00 and close at 14:45 with max capacity of 5 
        AND a booking to this area with 5 people at 13:00
        WHEN I retrieve the available hours of the day
        THEN the available hours of the day should be 0 in all hours of this area
      `, async () => {
    await mockAreaData(areaRepository);
    await mockBookingData(bookingRepository);

    // GIVEN
    const retrieveAvailableHoursOfDayDTO = {
      day: '01/01/2024',
      restaurantId: 'Restaurant_1',
    };

    // WHEN
    const hoursAvailable = await action.run(retrieveAvailableHoursOfDayDTO);

    // THEN
    expect(hoursAvailable[0].availability).toEqual([
      {
        hour: '13:00',
        available: 0,
      },
      {
        hour: '13:15',
        available: 0,
      },
      {
        hour: '13:30',
        available: 0,
      },
      {
        hour: '13:45',
        available: 0,
      },
      {
        hour: '14:00',
        available: 0,
      },
      {
        hour: '14:15',
        available: 0,
      },
      {
        hour: '14:30',
        available: 0,
      },
      {
        hour: '14:45',
        available: 0,
      },
    ]);
  });
});

async function mockAreaData(areaReposistory: AreaRepositoryPort) {
  return await areaReposistory.insertSome([
    Area.create(
      {
        name: new Name('Area_1_Name'),
        maxCapacity: 5,
        hoursPerReservation: 2,
        open: new Time('13:00'),
        close: new Time('14:45'),
        interval: 15,
        restaurantId: new ID('Restaurant_1'),
      },
      new ID('Area_1'),
    ),
  ]);
}

async function mockBookingData(bookingRepository: BookingRepositoryPort) {
  return await bookingRepository.insertSome([
    Booking.create(
      {
        clientId: new ID('Client_4'),
        tableId: new ID('Table_3'),
        day: new DateVO('01/01/2024'),
        start: new Time('13:00'),
        end: new Time('15:00'),
        people: 5,
        areaId: new ID('Area_1'),
      },
      new ID('Booking_4'),
    ),
  ]);
}
