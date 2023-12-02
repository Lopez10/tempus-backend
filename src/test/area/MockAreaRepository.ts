import { ID, PaginationQueryParams, Paginated } from '@common';
import { AreaDTO, AreaMapper } from '../../modules/area/Area.mapper';
import { Area } from '../../modules/area/domain/Area.entity';
import { AreaRepositoryPort } from '../../modules/area/domain/Area.repository.port';

export class MockAreaRepository implements AreaRepositoryPort {
  findByRestaurantId(restaurantId: ID): Promise<Area[]> {
    throw new Error('Method not implemented.');
  }
  insert(entity: Area): Promise<Area> {
    throw new Error('Method not implemented.');
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
  findPaginationByCriteria(
    paginated: PaginationQueryParams,
    criteria?: any,
  ): Promise<Paginated<Area>> {
    throw new Error('Method not implemented.');
  }
  update(entity: Area): Promise<Area> {
    throw new Error('Method not implemented.');
  }
  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
  private areasDTO: AreaDTO[] = [];
}
