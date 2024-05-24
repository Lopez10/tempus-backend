import { ServiceDto } from '@modules/service/service.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AvailabilityAreasDto {
	@ApiProperty({
		example: 'area-1',
		description: 'Id of the area',
	})
	areaId: string;

	@ApiProperty({
		example: '10/10/2021',
		description: 'Availability of hours of the day',
	})
	availability: AvailabilityScheduleDto[];
}

export class AvailabilityScheduleDto {
	@ApiProperty({
		example: '12:00',
		description: 'Hour of the availability',
	})
	hour: string;

	@ApiProperty({
		example: 2,
		description: 'Availability of the hour',
	})
	available: number;
}

export class ResponseAvailabilityScheduleDto {
	@ApiProperty({
		description: 'The availability schedule of areas',
		type: [AvailabilityAreasDto],
	})
	availabilityAreas: AvailabilityAreasDto[];

	@ApiProperty({
		description: 'Services of the restaurant',
		type: [ServiceDto],
	})
	services: ServiceDto[];
}
