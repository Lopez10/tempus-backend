import { ApiProperty } from '@nestjs/swagger';

export class HoursAvailableDto {
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
