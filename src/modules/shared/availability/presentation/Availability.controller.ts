import { Body, Controller, Get, Inject } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  HoursAvailableDto,
  RetrieveAvailableHoursOfDayDTO,
  RetrieveAvailableHoursOfDayUseCase,
} from '../application';
import { BookingPostgresRepository } from '@modules/booking';
import { AreaPostgresRepository } from '@modules/area';

@ApiTags('availability')
@Controller('availability')
export class AvailabilityController {
  constructor(
    @Inject(BookingPostgresRepository)
    private readonly bookingPostgresRepository: BookingPostgresRepository,

    @Inject(AreaPostgresRepository)
    private readonly areaPostgresRepository: AreaPostgresRepository,
  ) {}

  @Get()
  @ApiBody({
    type: RetrieveAvailableHoursOfDayDTO,
  })
  @ApiOkResponse({
    status: 200,
    description: 'The availability has been successfully retrieved.',
    type: Promise<HoursAvailableDto>,
  })
  async retrieveAvailability(
    @Body() retrieveAvailabilityDTO: RetrieveAvailableHoursOfDayDTO,
  ): Promise<HoursAvailableDto[]> {
    const retrieveAvailability = new RetrieveAvailableHoursOfDayUseCase(
      this.bookingPostgresRepository,
      this.areaPostgresRepository,
    );
    const availabilityDto = await retrieveAvailability.run(
      retrieveAvailabilityDTO,
    );

    return availabilityDto;
  }
}
