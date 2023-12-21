import { Time } from '@common';
import { ApiProperty } from '@nestjs/swagger';

export class HoursAvailableDTO {
  @ApiProperty()
  hour: Time;

  @ApiProperty()
  available: number;
}
