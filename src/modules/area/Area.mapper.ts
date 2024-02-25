import { ID, Name, Time } from "@common";
import { Area } from "./domain/Area.entity";

export interface AreaDto {
	id: string;
	name: string;
	maxCapacity: number;
	hoursPerReservation: number;
	open: string;
	close: string;
	interval: number;
	restaurantId: string;
}

export class AreaMapper {
	static toDomain(areaDto: AreaDto): Area {
		return Area.create(
			{
				name: new Name(areaDto.name),
				maxCapacity: areaDto.maxCapacity,
				hoursPerReservation: areaDto.hoursPerReservation,
				open: new Time(areaDto.open),
				close: new Time(areaDto.close),
				interval: areaDto.interval,
				restaurantId: new ID(areaDto.restaurantId),
			},
			new ID(areaDto.id),
		);
	}

	static toDto(area: Area): AreaDto {
		return {
			id: area.id.value,
			name: area.propsCopy.name.value,
			maxCapacity: area.propsCopy.maxCapacity,
			hoursPerReservation: area.propsCopy.hoursPerReservation,
			open: area.propsCopy.open.value,
			close: area.propsCopy.close.value,
			interval: area.propsCopy.interval,
			restaurantId: area.propsCopy.restaurantId.value,
		};
	}
}
