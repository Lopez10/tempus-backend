import { ApiProperty } from '@nestjs/swagger';

export class ServiceDto {
	@ApiProperty({
		example: '1',
		description: 'Id of the service',
	})
	serviceId: string;

	@ApiProperty({
		example: 'Pizza',
		description: 'Name of the service',
	})
	name: string;
}
