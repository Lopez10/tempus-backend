import { ApiProperty } from '@nestjs/swagger';

export class RetrieveAvailabilityCalendarDto {
  @ApiProperty({
    example: '1',
    description: 'restaurant id',
  })
  restaurantId: string;
}
