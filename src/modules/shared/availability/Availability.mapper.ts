import { Time } from '@common';
import {
  AvailabilityScheduleProps,
  Booking,
  timeAndPeopleOfBooking,
} from '../../booking/domain';
import { AvailabilityScheduleDto } from './application';

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
    };
  }
}
