import { BookingMapper, BookingDto, Booking } from '@modules';

export class BookingMother {
	static create(params: Partial<BookingDto>): Booking {
		const bookingDto = {
			id: 'bookingId',
			people: 4,
			start: '09:00',
			end: '11:00',
			day: '01/01/2022',
			areaId: 'areaId',
			clientId: 'clientId',
			tableId: 'tableId',
			...params,
		};

		return BookingMapper.toDomain(bookingDto);
	}
}
