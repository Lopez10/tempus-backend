import { ApiProperty } from '@nestjs/swagger';

export class RetrieveBookingsByDayDTO {
  @ApiProperty()
  day: string;

  @ApiProperty()
  areaId: string;

  @ApiProperty()
  people: number;
}
