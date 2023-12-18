import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AreaPostgresRepository } from '../infrastructure/Area.postgres.repository';
import { AreaDTO, AreaMapper } from '../Area.mapper';
import {
  CreateAreaDTO,
  CreateAreaUseCase,
  RetrieveAreaDTO,
  RetrieveAreaUseCase,
  RetrieveAreasByRestaurantIdDTO,
  RetrieveAreasByRestaurantIdUseCase,
} from '../application';

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

  @Get()
  async getAreaById(
    @Body() retrieveAreaDTO: RetrieveAreaDTO,
  ): Promise<AreaDTO> {
    const retrieveArea = new RetrieveAreaUseCase(this.areaPostgresRepository);
    const area = await retrieveArea.run(retrieveAreaDTO);

    return area;
  }

  @Get('/restaurant')
  @ApiResponse({
    status: 200,
    description: '.',
    type: Promise<AreaDTO[]>,
  })
  async getAreasByRestaurantId(
    @Body() retrieveAreasByRestaurantIdDTO: RetrieveAreasByRestaurantIdDTO,
  ): Promise<AreaDTO[]> {
    const retrieveAreasByRestaurantId = new RetrieveAreasByRestaurantIdUseCase(
      this.areaPostgresRepository,
    );

    const areasDTO = await retrieveAreasByRestaurantId.run(
      retrieveAreasByRestaurantIdDTO,
    );

    return areasDTO;
  }
}
