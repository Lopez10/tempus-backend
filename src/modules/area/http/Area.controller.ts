import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AreaPostgresRepository } from '../infrastructure/area.postgres.repository';
import { AreaMapper } from '../area.mapper';
import {
	CreateAreaDto,
	CreateAreaUseCase,
	RetrieveAreaUseCase,
	RetrieveAreasByRestaurantIdDto,
	RetrieveAreasByRestaurantIdUseCase,
} from '../application';
import { AreaDto } from '../area.dto';

@ApiTags('area')
@Controller('area')
export class AreaController {
	constructor(
		@Inject(AreaPostgresRepository)
		private readonly areaPostgresRepository: AreaPostgresRepository,
	) {}

	@Post()
	async createArea(@Body() createAreaDTO: CreateAreaDto): Promise<AreaDto> {
		const createArea = new CreateAreaUseCase(this.areaPostgresRepository);
		const areaCreated = await createArea.run(createAreaDTO);

		return AreaMapper.toDto(areaCreated);
	}

	@Get('/')
	@ApiResponse({
		status: 200,
		description: '.',
		type: AreaDto,
	})
	async getAreaById(@Query('id') id: string): Promise<AreaDto> {
		const retrieveArea = new RetrieveAreaUseCase(this.areaPostgresRepository);
		const area = await retrieveArea.run(id);

		return area;
	}

	@Get('/restaurant')
	@ApiResponse({
		status: 200,
		description: '',
		type: [AreaDto],
	})
	async getAreasByRestaurantId(
		@Query('restaurantId') restaurantId: string,
	): Promise<AreaDto[]> {
		const retrieveAreasByRestaurantId = new RetrieveAreasByRestaurantIdUseCase(
			this.areaPostgresRepository,
		);

		const areasDTO = await retrieveAreasByRestaurantId.run(restaurantId);

		return areasDTO;
	}
}
