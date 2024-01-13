import { ApiProperty } from '@nestjs/swagger';

export class AvailabilityCalendarDto {
  @ApiProperty({
    example: '01/01/2021',
    description: 'Date of the availability',
  })
  day: string;

  @ApiProperty({
    example: true,
    description: 'Is the day available?',
  })
  available: boolean;
}
