import { ApiProperty } from '@nestjs/swagger';

export class RetrieveAvailabilityCalendarDto {
  @ApiProperty({
    example: '01/2023',
    description: 'Month to retrieve availability',
  })
  month: string;

  @ApiProperty({
    example: '1',
    description: 'restaurant id',
  })
  restaurantId: string;
}
