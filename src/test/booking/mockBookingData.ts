import { DateVO, ID, Time } from '@common';
import { Booking, BookingRepositoryPort } from '@modules';

export async function mockBookingData(
  bookingRepository: BookingRepositoryPort,
) {
  return await bookingRepository.insertSome([
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
    // Booking.create(
    //   {
    //     clientId: new ID('Client_2'),
    //     tableId: new ID('Table_2'),
    //     day: new DateVO('01/01/2024'),
    //     start: new Time('11:00'),
    //     end: new Time('12:00'),
    //     people: 3,
    //     areaId: new ID('Area_1'),
    //   },
    //   new ID('Booking_2'),
    // ),
    // Booking.create(
    //   {
    //     clientId: new ID('Client_3'),
    //     tableId: new ID('Table_3'),
    //     day: new DateVO('01/01/2024'),
    //     start: new Time('12:00'),
    //     end: new Time('13:00'),
    //     people: 3,
    //     areaId: new ID('Area_1'),
    //   },
    //   new ID('Booking_3'),
    // ),
    // Booking.create(
    //   {
    //     clientId: new ID('Client_4'),
    //     tableId: new ID('Table_4'),
    //     day: new DateVO('01/01/2024'),
    //     start: new Time('13:00'),
    //     end: new Time('14:00'),
    //     people: 3,
    //     areaId: new ID('Area_1'),
    //   },
    //   new ID('Booking_4'),
    // ),
    // Booking.create(
    //   {
    //     clientId: new ID('Client_5'),
    //     tableId: new ID('Table_5'),
    //     day: new DateVO('01/01/2024'),
    //     start: new Time('14:00'),
    //     end: new Time('15:00'),
    //     people: 3,
    //     areaId: new ID('Area_1'),
    //   },
    //   new ID('Booking_5'),
    // ),
    // Booking.create(
    //   {
    //     clientId: new ID('Client_6'),
    //     tableId: new ID('Table_6'),
    //     day: new DateVO('01/01/2024'),
    //     start: new Time('15:00'),
    //     end: new Time('16:00'),
    //     people: 3,
    //     areaId: new ID('Area_1'),
    //   },
    //   new ID('Booking_6'),
    // ),
    // Booking.create(
    //   {
    //     clientId: new ID('Client_7'),
    //     tableId: new ID('Table_7'),
    //     day: new DateVO('01/01/2024'),
    //     start: new Time('16:00'),
    //     end: new Time('17:00'),
    //     people: 3,
    //     areaId: new ID('Area_1'),
    //   },
    //   new ID('Booking_7'),
    // ),
    // Booking.create(
    //   {
    //     clientId: new ID('Client_8'),
    //     tableId: new ID('Table_8'),
    //     day: new DateVO('01/01/2024'),
    //     start: new Time('17:00'),
    //     end: new Time('18:00'),
    //     people: 3,
    //     areaId: new ID('Area_1'),
    //   },
    //   new ID('Booking_8'),
    // ),
  ]);
}
