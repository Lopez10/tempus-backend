import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AvailablePostgresRepository } from '../infrastructure/Available.postgres.repository';
import { CreateAvailableUseCase } from '../application/useCase/CreateAvailable/CreateAvailable.useCase';
import { AvailableDTO, AvailableMapper } from '../Available.mapper';
import { RetrieveAvailableUseCase } from '../application/useCase/RetrieveAvailable/RetrieveAvailable.useCase';
import { CreateMultipleAvailableByDateUseCase } from '../application/useCase/CreateMultipleAvailableByDate/CreateMultipleAvailableByDate.useCase';
import { CreateAvailableDTO } from '../application/useCase/CreateAvailable/CreateAvailableDTO';
import { CreateMultipleAvailableByDateDTO } from '../application/useCase/CreateMultipleAvailableByDate/CreateMultipleAvailableByDateDTO';
import { RetrieveAvailableDTO } from '../application/useCase/RetrieveAvailable/RetrieveAvailableDTO';

@ApiTags('available')
@Controller('available')
export class AvailableController {
  constructor(
    @Inject(AvailablePostgresRepository)
    private readonly availablePostgresRepository: AvailablePostgresRepository,
  ) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'The available has been successfully created.',
    schema: {},
    type: Promise<AvailableDTO>,
  })
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
  async retrieveAvailableById(
    @Body() retrieveAvailableDTO: RetrieveAvailableDTO,
  ): Promise<AvailableDTO> {
    const retrieveAvailableById = new RetrieveAvailableUseCase(
      this.availablePostgresRepository,
    );
    const availableDTO = await retrieveAvailableById.run(retrieveAvailableDTO);

    return availableDTO;
  }

  @Post('/multiple')
  @ApiResponse({
    status: 200,
    description: 'The availables has been successfully created.',
    schema: {},
    type: Promise<AvailableDTO[]>,
  })
  async createMultipleAvailable(
    @Body()
    createMultipleAvailableByDateDTO: CreateMultipleAvailableByDateDTO,
  ): Promise<AvailableDTO[]> {
    const createMultipleAvailableByDateUseCase =
      new CreateMultipleAvailableByDateUseCase(
        this.availablePostgresRepository,
      );
    const availablesDTO = await createMultipleAvailableByDateUseCase.run(
      createMultipleAvailableByDateDTO,
    );

    return availablesDTO;
  }
}
