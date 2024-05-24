import { ApiProperty } from '@nestjs/swagger';

export class BookingDto {
  @ApiProperty({
    example: '1',
    description: 'The booking id',
  })
  id: string;

  @ApiProperty({
    example: '2',
    description: 'The number of people',
  })
  people: number;

  @ApiProperty({
    example: '12/12/2023',
    description: 'The day of the booking',
  })
  day: string;

  @ApiProperty({
    example: '12:00',
    description: 'The start time of the booking',
  })
  start: string;

  @ApiProperty({
    example: '14:00',
    description: 'The end time of the booking',
  })
  end: string;

  @ApiProperty({
    example: '1',
    description: 'The area id',
  })
  areaId: string;

  @ApiProperty({
    example: '1',
    description: 'The client id',
  })
  clientId: string;

  @ApiProperty({
    example: '1',
    description: 'The table id',
  })
  tableId: string;
}
