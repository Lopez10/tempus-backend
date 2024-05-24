import type { UseCase } from '@common';
import { Inject, Injectable } from '@nestjs/common';
import type { RetrieveAreasDto } from './retrieve-areas.dto';
import {
	AreaRepository,
	type AreaRepositoryPort,
} from '../../../domain/area.repository.port';
import { AreaMapper } from '../../../area.mapper';
import { AreaDto } from '@modules/area/area.dto';

@Injectable()
export class RetrieveAreasUseCase
	implements UseCase<RetrieveAreasDto, AreaDto[]>
{
	constructor(
		@Inject(AreaRepository)
		private readonly repository: AreaRepositoryPort,
	) {}
	async run(retrieveAreasDto: RetrieveAreasDto): Promise<AreaDto[]> {
		const areas = await this.repository.findPaginationByCriteria(
			retrieveAreasDto.criteria,
			retrieveAreasDto.pagination,
		);

		const areasDto = areas.data.map(AreaMapper.toDto);

		return areasDto;
	}
}
