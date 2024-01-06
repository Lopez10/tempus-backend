import { DateVO, ID, Time } from '@common';
import { Booking } from './domain';

export interface BookingDto {
  id: string;
  people: number;
  day: string;
  start: string;
  end: string;
  areaId: string;
  clientId: string;
  tableId: string;
}

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
      id: booking.getPropsCopy().id.value,
      people: booking.getPropsCopy().people,
      day: booking.getPropsCopy().day.value,
      start: booking.getPropsCopy().start.value,
      end: booking.getPropsCopy().end.value,
      areaId: booking.getPropsCopy().areaId.value,
      clientId: booking.getPropsCopy().clientId.value,
      tableId: booking.getPropsCopy().tableId.value,
    };
  }
}
