import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  capacity: number;
}
