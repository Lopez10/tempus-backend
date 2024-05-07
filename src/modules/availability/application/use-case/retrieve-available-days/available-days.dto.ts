import { ApiProperty } from '@nestjs/swagger';

export class AvailableDaysDto {
  @ApiProperty({
    example: ['01/02/2023', '02/02/2023', '04/02/2023', '05/02/2023'],
    description: 'Date of the availability',
  })
  days: string[];
}
