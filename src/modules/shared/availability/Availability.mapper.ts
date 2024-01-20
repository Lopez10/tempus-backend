import { DateVO, Time } from '@common';
import {
  AvailabilityCalendarProps,
  AvailabilityScheduleProps,
  Booking,
  timeAndPeopleOfBooking,
} from '../../booking/domain';
import { AvailabilityScheduleDto } from './application';
import { AvailableDaysDto } from './application/useCase/RetrieveAvailableDays/AvailableDays.dto';

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

  static toCalendarDto(
    availability: AvailabilityCalendarProps,
  ): AvailableDaysDto {
    return {
      day: availability.day.value,
      available: availability.available,
    };
  }

  static toCalendarDomain(
    availabilityDTO: AvailableDaysDto,
  ): AvailabilityCalendarProps {
    return {
      day: new DateVO(availabilityDTO.day),
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
