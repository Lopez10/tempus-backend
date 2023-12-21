import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  maxCapacity: number;

  @ApiProperty()
  hoursPerReservation: number;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  interval: number;

  @ApiProperty()
  restaurantId: string;
}
