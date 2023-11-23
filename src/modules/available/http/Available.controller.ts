import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AvailablePostgresRepository } from '../infrastructure/Available.postgres.repository';
import {
  CreateAvailableDTO,
  CreateAvailableUseCase,
} from '../application/CreateAvailable.useCase';
import { AvailableDTO, AvailableMapper } from '../Available.mapper';

@ApiTags('available')
@Controller('available')
export class AvailableController {
  constructor(
    @Inject(AvailablePostgresRepository)
    private readonly availablePostgresRepository: AvailablePostgresRepository,
  ) {}

  @Post()
  async createAvailable(
    @Body() createAvailableDTO: CreateAvailableDTO,
  ): Promise<AvailableDTO> {
    const createAvailable = new CreateAvailableUseCase(
      this.availablePostgresRepository,
    );
    const available = await createAvailable.run(createAvailableDTO);

    return AvailableMapper.toDTO(available);
  }

  @Get('/:areaId')
  async getAvailable(): Promise<AvailableDTO> {
    // const retrieveAvailablePaginatedByCriteria =
    //   new RetrieveAvailablePaginatedByCriteria(
    //     this.availablePostgresRepository,
    //   );
    // const availableDTO = await retrieveAvailablePaginatedByCriteria.run();
    // return availableDTO;
  }
}
