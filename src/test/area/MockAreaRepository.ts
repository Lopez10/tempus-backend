import { ID, PaginationQueryParams, Paginated } from '@common';
import { AreaDTO, AreaMapper } from '../../modules/area/Area.mapper';
import { Area } from '../../modules/area/domain/Area.entity';
import { AreaRepositoryPort } from '../../modules/area/domain/Area.repository.port';

export class MockAreaRepository implements AreaRepositoryPort {
  private areasDTO: AreaDTO[] = [];

  findByRestaurantId(restaurantId: ID): Promise<Area[]> {
    const areasDTO = this.areasDTO.filter(
      (area) => area.restaurantId === restaurantId.value,
    );

    const areas = areasDTO.map(AreaMapper.toDomain);

    return Promise.resolve(areas);
  }
  insert(entity: Area): Promise<Area> {
    const areaDTO = AreaMapper.toDTO(entity);
    this.areasDTO.push(areaDTO);

    return Promise.resolve(entity);
  }
  async insertSome(entity: Area[]): Promise<Area[]> {
    const areasDTO = entity.map((area) => AreaMapper.toDTO(area));
    this.areasDTO.push(...areasDTO);

    return entity;
  }
  async findOneById(id: ID): Promise<Area | null> {
    const areaDTO = this.areasDTO.find((area) => area.id === id.value);
    if (!areaDTO) return null;
    return AreaMapper.toDomain(areaDTO);
  }
  findAll(): Promise<Area[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: ID): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async findPaginationByCriteria(
    paginated: PaginationQueryParams,
    criteria?: any,
  ): Promise<Paginated<Area>> {
    const areasDTO = this.areasDTO.filter((area) => {
      if (criteria?.restaurantId) {
        return area.restaurantId === criteria.restaurantId;
      }
      return true;
    });

    const areas = areasDTO.map(AreaMapper.toDomain);

    return {
      data: areas,
      count: areas.length,
      limit: paginated.limit,
      page: paginated.page,
    };
  }
  update(entity: Area): Promise<Area> {
    throw new Error('Method not implemented.');
  }
  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
