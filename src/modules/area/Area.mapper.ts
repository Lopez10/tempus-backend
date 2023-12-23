import { ID, Name, Time } from '@common';
import { Area } from './domain/Area.entity';

export interface AreaDTO {
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
  static toDomain(areaDTO: AreaDTO): Area {
    return Area.create(
      {
        name: new Name(areaDTO.name),
        maxCapacity: areaDTO.maxCapacity,
        hoursPerReservation: areaDTO.hoursPerReservation,
        open: new Time(areaDTO.open),
        close: new Time(areaDTO.close),
        interval: areaDTO.interval,
        restaurantId: new ID(areaDTO.restaurantId),
      },
      new ID(areaDTO.id),
    );
  }

  static toDTO(area: Area): AreaDTO {
    return {
      id: area.id.value,
      name: area.getPropsCopy().name.value,
      maxCapacity: area.getPropsCopy().maxCapacity,
      hoursPerReservation: area.getPropsCopy().hoursPerReservation,
      open: area.getPropsCopy().open.value,
      close: area.getPropsCopy().close.value,
      interval: area.getPropsCopy().interval,
      restaurantId: area.getPropsCopy().restaurantId.value,
    };
  }
}
