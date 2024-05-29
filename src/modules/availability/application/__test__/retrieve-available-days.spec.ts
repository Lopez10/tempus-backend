import { Name, Time, ID, DateVO } from '@common';
import {
	Area,
	AreaRepositoryPort,
	Booking,
	BookingRepositoryPort,
	RetrieveAvailableDaysUseCase,
} from '@modules';
import { MockAreaRepository } from '@modules/area/infrastructure/area.mock.repository';
import { BookingMockRepository } from '@modules/booking/infrastructure/booking.mock.repository';

describe('Retrieve available days', () => {
	jest.useFakeTimers().setSystemTime(new Date('2021-01-01'));
	const areaRepository = new MockAreaRepository();
	const bookingRepository = new BookingMockRepository();

	const action = new RetrieveAvailableDaysUseCase(
		bookingRepository,
		areaRepository,
	);

	afterEach(async () => {
		bookingRepository.clear();
		areaRepository.clear();
	});

	it(`
    GIVEN an area data of restaurant with open reservations at 13:00 and close at 14:45 with max capacity of 5
    AND a booking to this area with 5 people 13:00 - 15:00 on 01/01/2021
    WHEN I retrieve the available days of the restaurant 
    THEN the available days of the restaurant should be all days of the month without 01/01/2021
    `, async () => {
		mockAreaData(areaRepository);
		mockMultipleBookingData(bookingRepository);

		// GIVEN
		const restaurantId = 'Restaurant_1';

		// WHEN
		const availableDays = await action.run(restaurantId);

		// THEN
		expect(availableDays.days).toEqual([
			'02/01/2021',
			'03/01/2021',
			'04/01/2021',
			'05/01/2021',
			'06/01/2021',
			'07/01/2021',
			'08/01/2021',
			'09/01/2021',
			'10/01/2021',
			'11/01/2021',
			'12/01/2021',
			'13/01/2021',
			'14/01/2021',
			'15/01/2021',
			'16/01/2021',
			'17/01/2021',
			'18/01/2021',
			'19/01/2021',
			'20/01/2021',
			'21/01/2021',
			'22/01/2021',
			'23/01/2021',
			'24/01/2021',
			'25/01/2021',
			'26/01/2021',
			'27/01/2021',
			'28/01/2021',
			'29/01/2021',
			'30/01/2021',
			'31/01/2021',
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

async function mockMultipleBookingData(
	bookingRepository: BookingRepositoryPort,
) {
	return await bookingRepository.insertSome([
		Booking.create(
			{
				clientId: new ID('Client_4'),
				tableId: new ID('Table_3'),
				day: new DateVO('01/01/2021'),
				start: new Time('13:00'),
				end: new Time('15:00'),
				people: 5,
				areaId: new ID('Area_1'),
			},
			new ID('Booking_4'),
		),
	]);
}
