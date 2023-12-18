import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  maxCapacity: number;

  @ApiProperty()
  hoursPerReservation: number;

  @ApiProperty()
  restaurantId: string;
}
