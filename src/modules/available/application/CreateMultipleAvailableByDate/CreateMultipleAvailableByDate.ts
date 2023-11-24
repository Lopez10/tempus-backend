import { ApiProperty } from '@nestjs/swagger';

export interface CreateMultipleAvailableByDateDTO {
  areaId: string;
  dates: Date[];
  available: number;
}

export class CreateMultipleAvailableByDateDTO {
  @ApiProperty()
  areaId: string;

  @ApiProperty()
  dates: Date[];

  @ApiProperty()
  available: number;
}
