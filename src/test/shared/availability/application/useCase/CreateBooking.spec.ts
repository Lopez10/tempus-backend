import { AvailabilityService, CreateBookingUseCase } from '@modules';
import { MockAreaRepository } from '../../../../area/MockAreaRepository';
import { mockAreaData } from '../../../../area/mockAreaData';
import { MockBookingRepository } from '../../../../booking/MockBookingRepository';

describe('Create Booking Use Case', () => {
  it(`
        GIVEN a booking data
        AND an area data
        WHEN I create a booking
        THEN the booking should be created correctly
    `, async () => {
    const areaRepository = new MockAreaRepository();
    const bookingRepository = new MockBookingRepository();
    const availabilityService = new AvailabilityService();

    const action = new CreateBookingUseCase(
      bookingRepository,
      areaRepository,
      availabilityService,
    );

    await mockAreaData(areaRepository);

    // GIVEN
    const createBookingDTO = {
      areaId: 'Area_2',
      clientId: 'Client_1',
      tableId: 'Table_1',
      day: '01/01/2024',
      start: '12:00',
      end: '14:00',
      serviceIds: ['Service_1'],
      people: 3,
    };

    // WHEN
    const booking = await action.run(createBookingDTO);

    // THEN
    expect(booking.day).toEqual('01/01/2024');
    expect(booking.start).toEqual('12:00');
    expect(booking.end).toEqual('14:00');
    expect(booking.people).toEqual(3);
    expect(booking.areaId).toEqual('Area_2');
    expect(booking.clientId).toEqual('Client_1');
    expect(booking.tableId).toEqual('Table_1');
  });
});
