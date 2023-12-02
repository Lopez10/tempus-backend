import { ID, PaginationQueryParams, Paginated } from '@common';
import { Area } from '../domain/Area.entity';
import { PrismaClient, Area as areaModel } from '@prisma/client';
import prisma from '@common/infrastructure/db';
import { AreaRepositoryPort } from '../domain/Area.repository.port';
import { AreaMapper } from '../Area.mapper';

export class AreaPostgresRepository implements AreaRepositoryPort {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
  async findByRestaurantId(restaurantId: ID): Promise<Area[]> {
    const areasDTO: areaModel[] = await this.prisma.area.findMany({
      where: { restaurantId: restaurantId.value },
    });

    const areas = areasDTO.map((area) => AreaMapper.toDomain(area));

    return areas;
  }
  async insert(entity: Area): Promise<Area> {
    const area: areaModel = AreaMapper.toDTO(entity);
    const areaCreated = await this.prisma.area.create({
      data: area,
    });

    return AreaMapper.toDomain(areaCreated);
  }
  insertSome(entity: Area[]): Promise<Area[]> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: ID): Promise<Area> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Area[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: ID): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findPaginationByCriteria(
    criteria: any,
    params: PaginationQueryParams,
  ): Promise<Paginated<Area>> {
    throw new Error('Method not implemented.');
  }
  update(entity: Area): Promise<Area> {
    throw new Error('Method not implemented.');
  }
  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
