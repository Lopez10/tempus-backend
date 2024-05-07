import { ID, UseCase } from '@common';
import { RetrieveBookingDto } from './retrieve-booking.dto';
import { BookingMapper } from '@modules/booking/booking.mapper';
import { Inject, Injectable } from '@nestjs/common';
import {
	BookingRepository,
	BookingRepositoryPort,
} from '@modules/booking/domain';
import { BookingDto } from '@modules/booking';

@Injectable()
export class RetrieveBookingUseCase
	implements UseCase<RetrieveBookingDto, BookingDto>
{
	constructor(
		@Inject(BookingRepository)
		private readonly bookPostgresRepository: BookingRepositoryPort,
	) {}
	async run(retrieveBookDTO: RetrieveBookingDto): Promise<BookingDto | null> {
		try {
			const id = new ID(retrieveBookDTO.id);
			const book = await this.bookPostgresRepository.findOneById(id);

			if (!book) throw new Error('Book not found');

			return BookingMapper.toDto(book);
		} catch (error) {
			throw new Error(error);
		}
	}
}
