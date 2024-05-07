import { PaginationQueryParams } from '@common';
import { ApiProperty } from '@nestjs/swagger';

export class RetrieveRestaurantsDto {
  @ApiProperty({ example: {}, required: false })
  criteria?: any;

  @ApiProperty({
    example: {
      limit: 10,
      offset: 0,
      page: 0,
      orderBy: { field: 'name', param: 'asc' },
    },
  })
  pagination: PaginationQueryParams;
}
