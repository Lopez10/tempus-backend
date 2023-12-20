import { PaginationQueryParams } from '@common';
import { ApiProperty } from '@nestjs/swagger';

export class RetrieveRestaurantsDTO {
  @ApiProperty()
  criteria?: any;

  @ApiProperty()
  pagination: PaginationQueryParams;
}
