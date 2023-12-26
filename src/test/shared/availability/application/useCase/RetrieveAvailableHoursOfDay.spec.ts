import {
  AreaRepositoryPort,
  BookingRepositoryPort,
  RetrieveAvailableHoursOfDayUseCase,
} from '@modules';
import { MockAreaRepository } from '../../../../area/MockAreaRepository';
import { MockBookingRepository } from '../../../../booking/MockBookingRepository';
import { mockAreaData } from '../../../../area/mockAreaData';
import { mockBookingData } from '../../../../booking/mockBookingData';

describe('Retrieve Available Hours Of Day Use Case', () => {
  it(`
    GIVEN a restaurant data
    WHEN I call to the use case to retrieve the available hours of the day
    THEN the available hours of the day should be retrieved
  `, async () => {
    const areaRepository: AreaRepositoryPort = new MockAreaRepository();
    await mockAreaData(areaRepository);

    const bookingRepository: BookingRepositoryPort =
      new MockBookingRepository();
    await mockBookingData(bookingRepository);

    const action = new RetrieveAvailableHoursOfDayUseCase(
      bookingRepository,
      areaRepository,
    );

    // GIVEN
    const retrieveAvailableHoursOfDayDTO = {
      day: '01/01/2024',
      areaId: 'Area_1',
      people: 1,
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
        available: 9,
      },
      {
        hour: '11:00',
        available: 9,
      },
      {
        hour: '11:30',
        available: 9,
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
