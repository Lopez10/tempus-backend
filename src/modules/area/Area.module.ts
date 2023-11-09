import { Module } from '@nestjs/common';
import { AreaRepository } from './domain/Area.repository.port';
import { AreaPostgresRepository } from './infrastructure/Area.postgre.repository';

@Module({
  controllers: [],
  providers: [
    {
      provide: AreaRepository,
      useValue: AreaPostgresRepository,
    },
  ],
})
export class AreaModule {}
