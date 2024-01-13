import { ServiceDto } from '@modules/service/Service.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseAvailabilityScheduleDto {
  @ApiProperty({
    description: 'The availability schedule of areas',
  })
  availabilityAreas: AvailabilityAreasDto[];

  @ApiProperty({
    description: 'Services of the restaurant',
  })
  services: ServiceDto[];
}

export class AvailabilityAreasDto {
  @ApiProperty({
    example: 'area-1',
    description: 'Id of the area',
  })
  areaId: string;

  @ApiProperty({
    example: '2021-10-10',
    description: 'Availability of hours of the day',
  })
  availability: AvailabilityScheduleDto[];
}

export class AvailabilityScheduleDto {
  @ApiProperty({
    example: '12:00',
    description: 'Hour of the availability',
  })
  hour: string;

  @ApiProperty({
    example: 2,
    description: 'Availability of the hour',
  })
  available: number;
}
