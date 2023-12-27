import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDTO {
  @ApiProperty()
  people: number;

  @ApiProperty()
  start: string;

  @ApiProperty()
  end: string;

  @ApiProperty()
  day: string;

  @ApiProperty()
  areaId: string;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  tableId: string;

  @ApiProperty()
  serviceIds: string[];
}
