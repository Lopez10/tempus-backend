import { ApiProperty } from '@nestjs/swagger';

export class RetrieveAvailabilityCalendarDto {
  @ApiProperty({
    example: '01/01/2023',
    description: 'date to retrieve availability',
  })
  date: string;

  @ApiProperty({
    example: '1',
    description: 'restaurant id',
  })
  restaurantId: string;
}
