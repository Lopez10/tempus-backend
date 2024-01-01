import { Time } from '@common';
import {
  AvailabilityServiceProps,
  Booking,
  timeAndPeopleOfBooking,
} from '../../booking/domain';
import { HoursAvailableDto } from './application';

export class AvailabilityMapper {
  static toDTO(availability: AvailabilityServiceProps): HoursAvailableDto {
    return {
      hour: availability.hour.value,
      available: availability.available,
    };
  }

  static toDomain(
    availabilityDTO: HoursAvailableDto,
  ): AvailabilityServiceProps {
    return {
      hour: new Time(availabilityDTO.hour),
      available: availabilityDTO.available,
    };
  }

  static toTimeAndPeopleOfBookings(booking: Booking): timeAndPeopleOfBooking {
    return {
      start: booking.getPropsCopy().start,
      end: booking.getPropsCopy().end,
      people: booking.getPropsCopy().people,
    };
  }
}
