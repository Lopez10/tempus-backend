import { PaginationQueryParams } from '@common';
import { ApiProperty } from '@nestjs/swagger';

export class RetrieveBookingsDTO {
  @ApiProperty()
  criteria?: any;

  @ApiProperty()
  pagination: PaginationQueryParams;
}
