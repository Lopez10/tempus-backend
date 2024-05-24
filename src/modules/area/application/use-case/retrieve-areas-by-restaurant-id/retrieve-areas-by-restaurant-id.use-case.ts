import { AreaMapper } from '../../../area.mapper';
import { ID, UseCase } from '@common';
import { AreaRepositoryPort } from '../../../domain/area.repository.port';
import { AreaDto } from '@modules/area/area.dto';

export class RetrieveAreasByRestaurantIdUseCase
	implements UseCase<string, AreaDto[]>
{
	constructor(private readonly repository: AreaRepositoryPort) {}

	async run(restaurantId: string): Promise<AreaDto[]> {
		const restaurantIdDomain = new ID(restaurantId);
		const areas = await this.repository.findByRestaurantId(restaurantIdDomain);

		const areasDTO = areas.map(AreaMapper.toDto);

		return areasDTO;
	}
}
