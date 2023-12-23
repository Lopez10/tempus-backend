import { ApiProperty } from '@nestjs/swagger';

export class HoursAvailableDTO {
  @ApiProperty()
  hour: string;

  @ApiProperty()
  available: number;
}
