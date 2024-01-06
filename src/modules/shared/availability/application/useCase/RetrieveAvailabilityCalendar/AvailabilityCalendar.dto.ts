import { ApiProperty } from '@nestjs/swagger';

export class AvailabilityCalendarDto {
  @ApiProperty({
    example: '01/01/2021',
    description: 'Date of the availability',
  })
  day: string;

  @ApiProperty({
    example: 2,
    description: 'Availability of the day',
  })
  available: number;
}
