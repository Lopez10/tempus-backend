import { ApiProperty } from '@nestjs/swagger';

export class RetrieveAreasDTO {
  @ApiProperty()
  restaurantId: string;
}
