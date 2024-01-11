import { UseCase } from '@common';
import { Injectable } from '@nestjs/common';
import { RetrieveAvailabilityCalendarDto } from './RetrieveAvailabilityCalendar.dto';
import { AvailabilityCalendarDto } from './AvailabilityCalendar.dto';

@Injectable()
export class RetrieveAvailabilityCalendarUseCase
  implements
    UseCase<RetrieveAvailabilityCalendarDto, AvailabilityCalendarDto[]>
{
  async run(
    RetrieveAvailabilityCalendarDto,
  ): Promise<AvailabilityCalendarDto[]> {
    return;
  }
}
