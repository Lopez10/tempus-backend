import { DateVO, ID, Time } from '@common';
import { Booking } from './domain';
import { BookingDto } from './Booking.dto';

export class BookingMapper {
  static toDomain(bookingDto: BookingDto): Booking {
    return Booking.create(
      {
        people: bookingDto.people,
        day: new DateVO(bookingDto.day),
        start: new Time(bookingDto.start),
        end: new Time(bookingDto.end),
        areaId: new ID(bookingDto.areaId),
        clientId: new ID(bookingDto.clientId),
        tableId: new ID(bookingDto.tableId),
      },
      new ID(bookingDto.id),
    );
  }
  static toDto(booking: Booking): BookingDto {
    return {
      id: booking.propsCopy.id.value,
      people: booking.propsCopy.people,
      day: booking.propsCopy.day.value,
      start: booking.propsCopy.start.value,
      end: booking.propsCopy.end.value,
      areaId: booking.propsCopy.areaId.value,
      clientId: booking.propsCopy.clientId.value,
      tableId: booking.propsCopy.tableId.value,
    };
  }
}
