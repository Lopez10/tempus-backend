import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateBookingDto,
  CreateBookingUseCase,
  HoursAvailableDto,
  RetrieveAvailableHoursOfDayDto,
  RetrieveAvailableHoursOfDayUseCase,
} from '../application';
import { BookingDto, BookingPostgresRepository } from '@modules/booking';
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
    type: RetrieveAvailableHoursOfDayDto,
  })
  @ApiOkResponse({
    status: 200,
    description: 'The availability has been successfully retrieved.',
    type: Promise<HoursAvailableDto>,
  })
  async retrieveAvailability(
    @Body() retrieveAvailabilityDTO: RetrieveAvailableHoursOfDayDto,
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

  @Post()
  @ApiBody({
    type: CreateBookingDto,
  })
  @ApiOkResponse({
    status: 200,
    description: 'The booking has been successfully created.',
    type: Promise<BookingDto>,
  })
  async createBooking(
    @Body() createBookingDTO: CreateBookingDto,
  ): Promise<BookingDto> {
    const createBooking = new CreateBookingUseCase(
      this.bookingPostgresRepository,
      this.areaPostgresRepository,
    );
    const bookingDto = await createBooking.run(createBookingDTO);

    return bookingDto;
  }
}
