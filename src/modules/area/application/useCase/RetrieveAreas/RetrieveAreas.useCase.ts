import type { UseCase } from "@common";
import { Inject, Injectable } from "@nestjs/common";
import type { RetrieveAreasDto } from "./RetrieveAreas.dto";
import {
	AreaRepository,
	type AreaRepositoryPort,
} from "../../../../../modules/area/domain/Area.repository.port";
import {
	type AreaDto,
	AreaMapper,
} from "../../../../../modules/area/Area.mapper";

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
