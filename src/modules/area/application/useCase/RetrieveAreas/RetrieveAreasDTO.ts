import { PaginationQueryParams } from '@common';
import { ApiProperty } from '@nestjs/swagger';

export class RetrieveAreasDTO {
  @ApiProperty()
  criteria?: any;

  @ApiProperty()
  pagination: PaginationQueryParams;
}
