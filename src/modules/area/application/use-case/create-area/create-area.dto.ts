import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDto {
  @ApiProperty({
    example: 'Area 1',
    description: 'Name of the area',
  })
  name: string;

  @ApiProperty({
    example: 30,
    description: 'Max capacity of the area',
  })
  maxCapacity: number;

  @ApiProperty({
    example: 2,
    description: 'Number of hours per reservation',
  })
  hoursPerReservation: number;

  @ApiProperty({
    example: '10:00',
    description: 'Opening time',
  })
  open: string;

  @ApiProperty({
    example: '20:00',
    description: 'Closing time',
  })
  close: string;

  @ApiProperty({
    example: 30,
    description: 'Interval between reservations',
  })
  interval: number;

  @ApiProperty({
    example: 'Restaurant_1',
    description: 'Id of the restaurant',
  })
  restaurantId: string;
}
