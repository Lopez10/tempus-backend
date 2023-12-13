import { ApiProperty } from '@nestjs/swagger';

export class CreateMultipleAvailableByDateDTO {
  @ApiProperty()
  areaId: string;

  @ApiProperty()
  dates: Date[];

  @ApiProperty()
  available: number;
}
