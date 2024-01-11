import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateBookingDto,
  CreateBookingUseCase,
  AvailabilityScheduleDto,
  RetrieveAvailabilityScheduleDto,
  RetrieveAvailableHoursOfDayUseCase,
  ResponseAvailabilityScheduleDto,
} from '../application';
import { BookingDto, BookingPostgresRepository } from '@modules/booking';
import { AreaPostgresRepository } from '@modules/area';
import { AvailabilityCalendarDto } from '../application/useCase/RetrieveAvailabilityCalendar/AvailabilityCalendar.dto';
import { RetrieveAvailabilityCalendarDto } from '../application/useCase/RetrieveAvailabilityCalendar/RetrieveAvailabilityCalendar.dto';

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
    type: Promise<ResponseAvailabilityScheduleDto[]>,
  })
  async retrieveSchedule(
    @Body() retrieveAvailabilityDTO: RetrieveAvailabilityScheduleDto,
  ): Promise<ResponseAvailabilityScheduleDto[]> {
    const retrieveAvailability = new RetrieveAvailableHoursOfDayUseCase(
      this.bookingPostgresRepository,
      this.areaPostgresRepository,
    );
    const availabilityDto = await retrieveAvailability.run(
      retrieveAvailabilityDTO,
    );

    return availabilityDto;
  }

  @Get('calendar')
  @ApiBody({
    type: RetrieveAvailabilityCalendarDto,
  })
  @ApiOkResponse({
    status: 200,
    description: 'The calendar has been successfully retrieved.',
    type: Promise<AvailabilityCalendarDto[]>,
  })
  async retrieveCalendar(): Promise<AvailabilityCalendarDto[]> {
    throw new Error('Not implemented');
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
