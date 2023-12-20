import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDTO {
  @ApiProperty()
  people: number;

  @ApiProperty()
  start: Date;

  @ApiProperty()
  end: Date;

  @ApiProperty()
  areaId: string;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  tableId: string;

  @ApiProperty()
  serviceIds: string[];
}
