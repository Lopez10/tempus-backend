import { Time } from '@common';
import { AvailabilityScheduleDto } from './application';
import { AvailabilityScheduleProps, timeAndPeopleOfBooking } from './domain';
import { Booking } from '@modules/booking';

export class AvailabilityMapper {
  static toScheduleDto(
    availability: AvailabilityScheduleProps,
  ): AvailabilityScheduleDto {
    return {
      hour: availability.hour.value,
      available: availability.available,
    };
  }

  static toScheduleDomain(
    availabilityDTO: AvailabilityScheduleDto,
  ): AvailabilityScheduleProps {
    return {
      hour: new Time(availabilityDTO.hour),
      available: availabilityDTO.available,
    };
  }

  static toTimeAndPeopleOfBookings(booking: Booking): timeAndPeopleOfBooking {
    return {
      start: booking.propsCopy.start,
      end: booking.propsCopy.end,
      people: booking.propsCopy.people,
      day: booking.propsCopy.day,
    };
  }
}
