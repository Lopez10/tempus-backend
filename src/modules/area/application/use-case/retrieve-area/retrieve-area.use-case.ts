import { ID, UseCase } from '@common';
import { AreaMapper } from '../../../area.mapper';
import { Inject, Injectable } from '@nestjs/common';
import {
	AreaRepository,
	AreaRepositoryPort,
} from '../../../domain/area.repository.port';
import { AreaDto } from '@modules/area/area.dto';

@Injectable()
export class RetrieveAreaUseCase implements UseCase<string, AreaDto> {
	constructor(
		@Inject(AreaRepository)
		private readonly areaPostgresRepository: AreaRepositoryPort,
	) {}
	async run(id: string): Promise<AreaDto | null> {
		try {
			const idDomain = new ID(id);

			const area = await this.areaPostgresRepository.findOneById(idDomain);

			if (!area) throw new Error('Area not found');

			return AreaMapper.toDto(area);
		} catch (error) {
			throw new Error(error);
		}
	}
}
