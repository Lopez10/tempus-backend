import { ApiProperty } from '@nestjs/swagger';

export class CreateAvailableDTO {
  @ApiProperty()
  areaId: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  available: number;
}
