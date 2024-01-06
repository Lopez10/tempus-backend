import { DateVO, ID, UseCase } from '@common';
import { BookingDto, BookingMapper } from '@modules/booking/Booking.mapper';
import { Inject, Injectable } from '@nestjs/common';
import { RetrieveBookingsByDayDto } from './RetrieveBookingsByDayDto';
import {
  BookingRepository,
  BookingRepositoryPort,
} from '@modules/booking/domain';

@Injectable()
export class RetrieveBookingsByDayUseCase
  implements UseCase<RetrieveBookingsByDayDto, BookingDto[]>
{
  constructor(
    @Inject(BookingRepository)
    private readonly repository: BookingRepositoryPort,
  ) {}

  async run(
    retrieveBookingsByDayDto: RetrieveBookingsByDayDto,
  ): Promise<BookingDto[]> {
    const day = new DateVO(retrieveBookingsByDayDto.day);
    const areaId = new ID(retrieveBookingsByDayDto.areaId);

    const bookings = await this.repository.retrieveByDayAndAreaId(day, areaId);
    const bookingsDomain = bookings.map(BookingMapper.toDto);

    return bookingsDomain;
  }
}
