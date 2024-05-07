import { AreaDto, AreaMapper } from '../../../area.mapper';
import { RetrieveAreasByRestaurantIdDto } from './retrieve-areas-by-restaurant-id.dto';
import { ID, UseCase } from '@common';
import { AreaRepositoryPort } from '../../../domain/area.repository.port';

export class RetrieveAreasByRestaurantIdUseCase
	implements UseCase<RetrieveAreasByRestaurantIdDto, AreaDto[]>
{
	constructor(private readonly repository: AreaRepositoryPort) {}

	async run(
		retrieveAreasByRestaurantIdDTO: RetrieveAreasByRestaurantIdDto,
	): Promise<AreaDto[]> {
		const restaurantId = new ID(retrieveAreasByRestaurantIdDTO.restaurantId);
		const areas = await this.repository.findByRestaurantId(restaurantId);

		const areasDTO = areas.map(AreaMapper.toDto);

		return areasDTO;
	}
}
