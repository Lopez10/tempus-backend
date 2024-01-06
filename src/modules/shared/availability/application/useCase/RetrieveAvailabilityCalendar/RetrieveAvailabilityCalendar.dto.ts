import { ApiProperty } from '@nestjs/swagger';

export class RetrieveAvailabilityCalendarDto {
  @ApiProperty({
    example: '01',
    description: 'Month to retrieve availability',
  })
  month: string;

  @ApiProperty({
    example: '1',
    description: 'Area id of the booking',
  })
  areaId: string;
}
