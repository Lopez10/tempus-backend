import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AvailablePostgresRepository } from '../infrastructure/Available.postgres.repository';

@ApiTags('available')
@Controller('available')
export class AvailableController {
  constructor(
    @Inject(AvailablePostgresRepository)
    private readonly availablePostgresRepository: AvailablePostgresRepository,
  ) {}

  @Post()
  async createAvailable(): Promise<void> {
    // const createAvailable = new CreateAvailable(
    //   this.availablePostgresRepository,
    // );
    // const availableCreated = await createAvailable.run();
    // return AvailableMapper.toDTO(availableCreated);
  }

  @Get('/:areaId')
  async getAvailable(): Promise<void> {
    // const retrieveAvailablePaginatedByCriteria =
    //   new RetrieveAvailablePaginatedByCriteria(
    //     this.availablePostgresRepository,
    //   );
    // const availableDTO = await retrieveAvailablePaginatedByCriteria.run();
    // return availableDTO;
  }
}
