import { ID, Name, Time } from '@common';
import {
	Area,
	AreaRepositoryPort,
	CreateBookingDto,
	CreateBookingUseCase,
} from '@modules';
import { AreaMother } from '@modules/area/application/__test__/area.mother';
import { MockAreaRepository } from '@modules/area/infrastructure/area.mock.repository';
import { BookingMother } from '@modules/booking/application/__test__/booking.mother';
import { BookingMockRepository } from '@modules/booking/infrastructure/booking.mock.repository';

describe('Create Booking Use Case', () => {
	const areaRepository = new MockAreaRepository();
	const bookingRepository = new BookingMockRepository();

	const action = new CreateBookingUseCase(bookingRepository, areaRepository);

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
		const createBookingDTO: CreateBookingDto = {
			areaId: 'Area_2',
			clientName: 'John',
			clientSurname: 'Doe',
			clientEmail: 'test@test.com',
			clientPhone: '666777666',
			clientComment: 'Hello! I am alergical to gluten',
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
			clientName: 'John',
			clientSurname: 'Doe',
			clientEmail: 'test@test.com',
			clientPhone: '666777666',
			clientComment: 'Hello! I am alergical to gluten',
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
			clientName: 'John',
			clientSurname: 'Doe',
			clientEmail: 'test@test.com',
			clientPhone: '666777666',
			clientComment: 'Hello! I am alergical to gluten',
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
			clientName: 'John',
			clientSurname: 'Doe',
			clientEmail: 'test@test.com',
			clientPhone: '666777666',
			clientComment: 'Hello! I am alergical to gluten',
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

	it(`
      GIVEN a booking in the same day and time of another booking
      WHEN I create a booking
      THEN the booking should not be created
      AND I should receive an error message
    `, async () => {
		// GIVEN
		const area = AreaMother.create({ id: 'Area_2', maxCapacity: 10 });
		await areaRepository.insert(area);
		const booking = BookingMother.create({
			areaId: 'Area_2',
			start: '12:00',
			end: '14:00',
			day: '01/01/2024',
			people: 10,
		});

		await bookingRepository.insert(booking);

		const createBookingDto: CreateBookingDto = {
			areaId: 'Area_2',
			clientName: 'John',
			clientSurname: 'Doe',
			clientEmail: 'john@prueba.com',
			clientPhone: '666777666',
			clientComment: 'Hello! I am alergical to gluten',
			tableId: 'Table_1',
			day: '01/01/2024',
			start: '11:30',
			end: '13:30',
			people: 3,
			serviceIds: ['Service_1'],
		};

		// WHEN
		const bookingCreation = () => action.run(createBookingDto);

		// THEN
		expect(bookingCreation).rejects.toThrowError(
			'There is no availability for this booking',
		);
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
