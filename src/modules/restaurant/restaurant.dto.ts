import { ApiProperty } from '@nestjs/swagger';

export class RestaurantDto {
	@ApiProperty({
		example: '1',
		description: 'The restaurant id',
	})
	id: string;

	@ApiProperty({
		example: 'Restaurant name',
		description: 'The restaurant name',
	})
	name: string;

	@ApiProperty({
		example: 'test@test.com',
		description: 'The restaurant email',
	})
	email: string;

	@ApiProperty({
		example: 'Restaurant description',
		description: 'The restaurant description',
	})
	description: string;

	@ApiProperty({
		example: 10,
		description: 'The restaurant capacity',
	})
	capacity: number;
}
