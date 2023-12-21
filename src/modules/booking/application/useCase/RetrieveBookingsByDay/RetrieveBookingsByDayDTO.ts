import { ApiProperty } from '@nestjs/swagger';

export class RetrieveBookingsByDayDTO {
  @ApiProperty()
  day: Date;

  @ApiProperty()
  areaId: string;

  @ApiProperty()
  people: number;
}
