import { ApiProperty } from '@nestjs/swagger';

export class RetrieveBookDTO {
  @ApiProperty()
  id: string;
}
