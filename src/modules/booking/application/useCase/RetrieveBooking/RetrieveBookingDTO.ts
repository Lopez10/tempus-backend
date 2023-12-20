import { ApiProperty } from '@nestjs/swagger';

export class RetrieveBookingDTO {
  @ApiProperty()
  id: string;
}
