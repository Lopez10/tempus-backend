import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateBookingDto,
  CreateBookingUseCase,
  RetrieveAvailabilityScheduleDto,
  RetrieveAvailableHoursOfDayUseCase,
  ResponseAvailabilityScheduleDto,
} from '../application';
import { BookingDto, BookingPostgresRepository } from '@modules/booking';
import { AreaPostgresRepository } from '@modules/area';
import { AvailableDaysDto } from '../application/useCase/RetrieveAvailableDays/AvailableDays.dto';
import { RetrieveAvailableDaysDto } from '../application/useCase/RetrieveAvailableDays/RetrieveAvailableDays.dto';
import { ServiceDto } from '@modules/service/Service.dto';

@ApiTags('availability')
@Controller('availability')
export class AvailabilityController {
  constructor(
    @Inject(BookingPostgresRepository)
    private readonly bookingPostgresRepository: BookingPostgresRepository,

    @Inject(AreaPostgresRepository)
    private readonly areaPostgresRepository: AreaPostgresRepository,
  ) {}

  @Get('schedule')
  @ApiBody({
    type: RetrieveAvailabilityScheduleDto,
  })
  @ApiOkResponse({
    status: 200,
    description: 'The availability schedule has been successfully retrieved.',
    type: ResponseAvailabilityScheduleDto,
  })
  async retrieveSchedule(
    @Body() retrieveAvailabilityDTO: RetrieveAvailabilityScheduleDto,
  ): Promise<ResponseAvailabilityScheduleDto> {
    const retrieveAvailability = new RetrieveAvailableHoursOfDayUseCase(
      this.bookingPostgresRepository,
      this.areaPostgresRepository,
    );
    const availabilityAreas = await retrieveAvailability.run(
      retrieveAvailabilityDTO,
    );

    const services: ServiceDto[] = [];

    const responseAvailabilityScheduleDto: ResponseAvailabilityScheduleDto = {
      availabilityAreas,
      services,
    };

    return responseAvailabilityScheduleDto;
  }

  @Get('/days')
  @ApiBody({
    type: RetrieveAvailableDaysDto,
  })
  @ApiOkResponse({
    status: 200,
    description: 'The available days has been successfully retrieved',
    type: AvailableDaysDto,
  })
  async retrieveAvailableDays(): Promise<AvailableDaysDto> {
    throw new Error('Not implemented');
  }

  @Post()
  @ApiBody({
    type: CreateBookingDto,
  })
  @ApiOkResponse({
    status: 200,
    description: 'The booking has been successfully created.',
    type: [BookingDto],
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
