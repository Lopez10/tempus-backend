import { Module } from '@nestjs/common';
import { AreaRepository } from './domain/area.repository.port';
import { AreaPostgresRepository } from './infrastructure/area.postgres.repository';
import { AreaController } from './http/area.controller';
import {
	RetrieveAreaUseCase,
	RetrieveAreasByRestaurantIdUseCase,
	CreateAreaUseCase,
	RetrieveAreasUseCase,
} from './application';

@Module({
	controllers: [AreaController],
	providers: [
		AreaController,
		AreaPostgresRepository,
		{
			provide: AreaRepository,
			useValue: AreaPostgresRepository,
		},
		RetrieveAreaUseCase,
		RetrieveAreasByRestaurantIdUseCase,
		CreateAreaUseCase,
		RetrieveAreasUseCase,
	],
})
export class AreaModule {}
