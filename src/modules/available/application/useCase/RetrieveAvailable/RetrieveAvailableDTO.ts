import { ApiProperty } from '@nestjs/swagger';

export class RetrieveAvailableDTO {
  @ApiProperty()
  availableId: string;
}
