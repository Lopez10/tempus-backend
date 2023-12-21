import { ApiProperty } from '@nestjs/swagger';

export class RetrieveAvailableHoursOfDayDTO {
  @ApiProperty()
  day: Date;

  @ApiProperty()
  areaId: string;

  @ApiProperty()
  people: number;
}
