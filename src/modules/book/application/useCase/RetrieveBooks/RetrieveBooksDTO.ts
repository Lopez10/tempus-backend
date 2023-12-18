import { PaginationQueryParams } from '@common';
import { ApiProperty } from '@nestjs/swagger';

export class RetrieveBooksDTO {
  @ApiProperty()
  criteria?: any;

  @ApiProperty()
  pagination: PaginationQueryParams;
}
