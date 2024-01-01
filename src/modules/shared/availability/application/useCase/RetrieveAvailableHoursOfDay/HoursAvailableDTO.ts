import { ApiProperty } from '@nestjs/swagger';

export class HoursAvailableDto {
  @ApiProperty()
  hour: string;

  @ApiProperty()
  available: number;
}
