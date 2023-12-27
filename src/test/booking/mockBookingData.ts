import { DateVO, ID, Time } from '@common';
import { Booking, BookingRepositoryPort } from '@modules';

export async function mockSimpleBookingData(
  bookingRepository: BookingRepositoryPort,
) {
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

export async function mockMultipleBookingData(
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
