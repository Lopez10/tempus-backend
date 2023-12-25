import { Time } from '@common';
import { AvailabilityServiceProps } from '../../booking/domain';
import { HoursAvailableDTO } from './application';

export class AvailabilityMapper {
  static toDTO(availability: AvailabilityServiceProps): HoursAvailableDTO {
    return {
      hour: availability.hour.value,
      available: availability.available,
    };
  }

  static toDomain(
    availabilityDTO: HoursAvailableDTO,
  ): AvailabilityServiceProps {
    return {
      hour: new Time(availabilityDTO.hour),
      available: availabilityDTO.available,
    };
  }
}
