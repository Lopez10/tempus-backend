import { ApiProperty } from '@nestjs/swagger';

export class RetrieveAreasByRestaurantIdDTO {
  @ApiProperty()
  restaurantId: string;
}
