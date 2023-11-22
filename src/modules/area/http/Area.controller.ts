import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AreaPostgresRepository } from '../infrastructure/Area.postgre.repository';
import {
  RetrieveAreaDTO,
  RetrieveAreaUseCase,
} from '../application/UseCases/RetrieveArea.useCase';
import { AreaDTO } from '../Area.mapper';

@ApiTags('area')
@Controller('area')
export class AreaController {
  constructor(
    @Inject(AreaPostgresRepository)
    private readonly areaPostgresRepository: AreaPostgresRepository,
  ) {}

  @Post()
  async createArea(): Promise<void> {
    // const createArea = new CreateArea(this.areaPostgresRepository);
    // const areaCreated = await createArea.run();
    // return AreaMapper.toDTO(areaCreated);
  }

  @Get('/:id')
  async getAreaById(
    @Body() retrieveAreaDTO: RetrieveAreaDTO,
  ): Promise<AreaDTO> {
    const retrieveArea = new RetrieveAreaUseCase(this.areaPostgresRepository);
    const area = await retrieveArea.run(retrieveAreaDTO);

    return area;
  }
}
