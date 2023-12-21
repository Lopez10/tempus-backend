import { Time } from '@common';
import { AvailabilityServiceProps } from '../../booking/domain';

export interface AvailabilityDTO {
  hour: string;
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
      hour: new Time(availabilityDTO.hour),
      available: availabilityDTO.available,
    };
  }
}
