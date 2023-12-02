import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AreaPostgresRepository } from '../infrastructure/Area.postgre.repository';
import {
  RetrieveAreaDTO,
  RetrieveAreaUseCase,
} from '../application/UseCases/RetrieveArea.useCase';
import { AreaDTO, AreaMapper } from '../Area.mapper';
import {
  CreateAreaUseCase,
  CreateAreaDTO,
} from '../application/UseCases/CreateArea.useCase';
import { RetrieveAreasDTO } from '../application/UseCases/RetrieveAreas/RetrieveAreasDTO';

@ApiTags('area')
@Controller('area')
export class AreaController {
  constructor(
    @Inject(AreaPostgresRepository)
    private readonly areaPostgresRepository: AreaPostgresRepository,
  ) {}

  @Post()
  async createArea(@Body() createAreaDTO: CreateAreaDTO): Promise<AreaDTO> {
    const createArea = new CreateAreaUseCase(this.areaPostgresRepository);
    const areaCreated = await createArea.run(createAreaDTO);

    return AreaMapper.toDTO(areaCreated);
  }

  @Get('/:id')
  async getAreaById(
    @Body() retrieveAreaDTO: RetrieveAreaDTO,
  ): Promise<AreaDTO> {
    const retrieveArea = new RetrieveAreaUseCase(this.areaPostgresRepository);
    const area = await retrieveArea.run(retrieveAreaDTO);

    return area;
  }

  @Get('/restaurant/:id')
  async getAreasByRestaurantId(
    @Body() retrieveAreasDTO: RetrieveAreasDTO,
  ): Promise<AreaDTO[]> {
    throw new Error('Method not implemented.');
  }
}
