import { PaginationQueryParams } from '@common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RetrieveRestaurantsDto {
	@ApiPropertyOptional({ example: {}, required: false })
	criteria?: unknown;

	@ApiPropertyOptional()
	pagination: PaginationQueryParams;
}
