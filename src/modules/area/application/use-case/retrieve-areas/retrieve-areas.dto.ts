import { PaginationQueryParams } from '@common';
import { ApiProperty } from '@nestjs/swagger';

export class RetrieveAreasDto {
  @ApiProperty({
    example: {},
    required: false,
    description: 'Criteria to filter areas',
  })
  criteria?: any;

  @ApiProperty({
    example: {
      limit: 10,
      offset: 0,
      page: 0,
      orderBy: { field: 'createdAt', param: 'asc' },
    },
    description: 'Pagination options',
  })
  pagination: PaginationQueryParams;
}
