import { ApiProperty } from '@nestjs/swagger';

export class RetrieveBookingsByDayDto {
  @ApiProperty({
    example: '21/12/2020',
    description: 'Day to retrieve bookings',
  })
  day: string;

  @ApiProperty({
    example: '1',
    description: 'Id of the area',
  })
  areaId: string;

  @ApiProperty({
    example: 2,
    description: 'Number of people',
  })
  people: number;
}
