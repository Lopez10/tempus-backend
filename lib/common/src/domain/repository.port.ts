import { ApiProperty } from '@nestjs/swagger';
import { ID } from './valueObject';
import { IsNumber } from 'class-validator';

export class Paginated<T> {
	readonly count: number;
	readonly limit: number;
	readonly page: number;
	readonly data: readonly T[];

	constructor(props: Paginated<T>) {
		this.count = props.count;
		this.limit = props.limit;
		this.page = props.page;
		this.data = props.data;
	}
}

export class PaginationQueryParams {
	@IsNumber()
	limit: number;

	@IsNumber()
	offset: number;

	@IsNumber()
	page: number;

	@ApiProperty({ example: 'name' })
	orderByField: string;

	@ApiProperty({ example: 'asc' })
	orderByParam: string;
}

export interface RepositoryPort<Entity> {
	insert(entity: Entity): Promise<Entity>;
	insertSome(entity: Entity[]): Promise<Entity[]>;
	findOneById(id: ID): Promise<Entity | null>;
	findAll(): Promise<Entity[]>;
	delete(id: ID): Promise<boolean>;
	findPaginationByCriteria(
		paginated: PaginationQueryParams,
		criteria?: unknown,
	): Promise<Paginated<Entity>>;
	update(entity: Entity): Promise<Entity>;
	transaction<T>(handler: () => Promise<T>): Promise<T>;
}
