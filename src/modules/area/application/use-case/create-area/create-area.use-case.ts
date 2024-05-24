import { UseCase, Name, ID, Time } from '@common';
import { Injectable, Inject } from '@nestjs/common';

import { CreateAreaDto } from './create-area.dto';
import {
	AreaRepository,
	AreaRepositoryPort,
	AreaProps,
	Area,
} from '@modules/area/domain';

@Injectable()
export class CreateAreaUseCase implements UseCase<CreateAreaDto, Area> {
	constructor(
		@Inject(AreaRepository)
		private readonly repository: AreaRepositoryPort,
	) {}

	async run(createAreaDto: CreateAreaDto): Promise<Area> {
		const areaProps: AreaProps = {
			name: new Name(createAreaDto.name),
			maxCapacity: createAreaDto.maxCapacity,
			hoursPerReservation: createAreaDto.hoursPerReservation,
			open: new Time(createAreaDto.open),
			close: new Time(createAreaDto.close),
			interval: createAreaDto.interval,
			restaurantId: new ID(createAreaDto.restaurantId),
		};
		const area = Area.create(areaProps);
		await this.repository.insert(area);

		return area;
	}
}
