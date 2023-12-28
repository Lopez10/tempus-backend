import { AvailabilityService, CreateBookingUseCase } from '@modules';
import { MockAreaRepository } from '../../../../area/MockAreaRepository';
import { mockAreaData } from '../../../../area/mockAreaData';
import { MockBookingRepository } from '../../../../booking/MockBookingRepository';

describe('Create Booking Use Case', () => {
  const areaRepository = new MockAreaRepository();
  const availabilityService = new AvailabilityService();
  const bookingRepository = new MockBookingRepository();

  const action = new CreateBookingUseCase(
    bookingRepository,
    areaRepository,
    availabilityService,
  );

  afterEach(async () => {
    bookingRepository.clear();
    areaRepository.clear();
  });

  it(`
      GIVEN a valid booking data
      WHEN I create a booking
      THEN the booking should be created correctly
    `, async () => {
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

  it(`
      GIVEN a booking data with invalid hours per booking
      WHEN I create a booking
      THEN the booking should not be created
      AND I should receive an error message
    `, async () => {
    await mockAreaData(areaRepository);

    // GIVEN
    const createBookingDTO = {
      areaId: 'Area_2',
      clientId: 'Client_1',
      tableId: 'Table_1',
      day: '01/01/2024',
      start: '13:30',
      end: '14:00',
      serviceIds: ['Service_1'],
      people: 3,
    };

    // WHEN
    const bookingCreation = () => action.run(createBookingDTO);

    // THEN
    expect(bookingCreation).rejects.toThrowError('Invalid hours per booking');
  });

  it(`
      GIVEN a booking data with a start time before the open time of the area
      WHEN I create a booking
      THEN the booking should not be created
      AND I should receive an error message
    `, async () => {
    await mockAreaData(areaRepository);

    // GIVEN
    const createBookingDTO = {
      areaId: 'Area_2',
      clientId: 'Client_1',
      tableId: 'Table_1',
      day: '01/01/2024',
      start: '9:00',
      end: '11:00',
      serviceIds: ['Service_1'],
      people: 3,
    };

    // WHEN
    const bookingCreation = () => action.run(createBookingDTO);

    // THEN
    expect(bookingCreation).rejects.toThrowError('Invalid booking hours');
  });

  it(`
      GIVEN a booking data with a no existing area
      WHEN I create a booking
      THEN the booking should not be created
      AND I should receive an error message
    `, async () => {
    await mockAreaData(areaRepository);

    // GIVEN
    const createBookingDTO = {
      areaId: 'Area_no_existing',
      clientId: 'Client_1',
      tableId: 'Table_1',
      day: '01/01/2024',
      start: '13:00',
      end: '15:00',
      serviceIds: ['Service_1'],
      people: 3,
    };

    // WHEN
    const bookingCreation = () => action.run(createBookingDTO);

    // THEN
    expect(bookingCreation).rejects.toThrowError('Area not found');
  });
});
