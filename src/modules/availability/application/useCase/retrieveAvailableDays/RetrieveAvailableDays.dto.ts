import { ApiProperty } from '@nestjs/swagger';

export class RetrieveAvailableDaysDto {
  @ApiProperty({
    example: '1',
    description: 'restaurant id',
  })
  restaurantId: string;
}
