import { ApiProperty } from '@nestjs/swagger';

export class AreaDto {
	@ApiProperty({
		type: 'string',
		format: 'uuid',
		example: '123e4567-e',
	})
	id: string;

	@ApiProperty({
		type: 'string',
		example: 'Area 1',
	})
	name: string;

	@ApiProperty({
		type: 'number',
		example: 10,
	})
	maxCapacity: number;

	@ApiProperty({
		type: 'number',
		example: 2,
	})
	hoursPerReservation: number;

	@ApiProperty({
		type: 'string',
		example: '08:00',
	})
	open: string;

	@ApiProperty({
		type: 'string',
		example: '22:00',
	})
	close: string;

	@ApiProperty({
		type: 'number',
		example: 30,
	})
	interval: number;

	@ApiProperty({
		type: 'string',
		format: 'uuid',
		example: '123e4567-e',
	})
	restaurantId: string;
}
