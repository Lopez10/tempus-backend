import { ApiProperty } from '@nestjs/swagger';

export class RetrieveAvailableHoursOfDayDTO {
  @ApiProperty()
  day: string;

  @ApiProperty()
  areaId: string;
}
