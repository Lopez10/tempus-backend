import { ID, Time, Name } from '@common';
import {
  Area,
  AreaRepositoryPort,
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
});

async function mockAreaData(areaReposistory: AreaRepositoryPort) {
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
