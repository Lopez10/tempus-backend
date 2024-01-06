import { ApiProperty } from '@nestjs/swagger';

export class RetrieveAvailableHoursOfDayDto {
  @ApiProperty({
    example: '10/10/2021',
    description: 'Day to retrieve availability',
  })
  day: string;

  @ApiProperty({
    example: '1',
    description: 'Area id of the booking',
  })
  areaId: string;
}
