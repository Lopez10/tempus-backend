import { ApiProperty } from '@nestjs/swagger';

export class HoursAvailableDTO {
  @ApiProperty()
  hour: Date;

  @ApiProperty()
  available: number;
}
