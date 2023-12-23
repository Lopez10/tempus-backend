import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  maxCapacity: number;

  @ApiProperty()
  hoursPerReservation: number;

  @ApiProperty()
  open: string;

  @ApiProperty()
  close: string;

  @ApiProperty()
  interval: number;

  @ApiProperty()
  restaurantId: string;
}
