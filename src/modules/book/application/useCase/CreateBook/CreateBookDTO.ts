import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDTO {
  @ApiProperty()
  people: number;

  @ApiProperty()
  dateTime: Date;

  @ApiProperty()
  areaId: string;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  tableId: string;

  @ApiProperty()
  serviceIds: string[];
}
