import { DateTime } from '@common';
import { AvailabilityServiceProps } from '../domain';

export interface AvailabilityDTO {
  hour: Date;
  available: number;
}

export class AvailabilityMapper {
  static toDTO(availability: AvailabilityServiceProps): AvailabilityDTO {
    return {
      hour: availability.hour.value,
      available: availability.available,
    };
  }

  static toDomain(availabilityDTO: AvailabilityDTO): AvailabilityServiceProps {
    return {
      hour: new DateTime(availabilityDTO.hour),
      available: availabilityDTO.available,
    };
  }
}
