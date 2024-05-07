import { ApiProperty } from '@nestjs/swagger';

export class RetrieveAreasByRestaurantIdDto {
  @ApiProperty({
    example: '1',
    description: 'Id of the restaurant',
  })
  restaurantId: string;
}
