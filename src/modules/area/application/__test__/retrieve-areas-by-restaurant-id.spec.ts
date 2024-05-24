import { Name, ID, Time } from '@common';
import {
	Area,
	RetrieveAreasByRestaurantIdUseCase,
	AreaRepositoryPort,
} from '@modules';
import { MockAreaRepository } from '../../infrastructure/area.mock.repository';

describe('Retrieve Areas by restaurant Id Use Case', () => {
	it(`
        GIVEN there are many areas 
        WHEN the areas are retrieved by restaurant Id
        THEN the areas with the restaurant id should be returned
    `, async () => {
		const areaReposistory: AreaRepositoryPort = new MockAreaRepository();
		const action = new RetrieveAreasByRestaurantIdUseCase(areaReposistory);
		mockAreaData(areaReposistory);

		// GIVEN
		const restaurantId = 'Restaurant_1';

		// WHEN
		const areas = await action.run(restaurantId);

		// THEN
		expect(areas.length).toEqual(1);
		expect(areas[0].name).toEqual('Area_1');
	});
});

export async function mockAreaData(areaReposistory: AreaRepositoryPort) {
	return await areaReposistory.insertSome([
		Area.create(
			{
				name: new Name('Area_1'),
				maxCapacity: 10,
				hoursPerReservation: 1,
				open: new Time('10:00'),
				close: new Time('22:00'),
				interval: 30,
				restaurantId: new ID('Restaurant_1'),
			},
			new ID('Area_1'),
		),
		Area.create(
			{
				name: new Name('Area_2'),
				maxCapacity: 10,
				hoursPerReservation: 1,
				open: new Time('10:00'),
				close: new Time('22:00'),
				interval: 30,
				restaurantId: new ID('Restaurant_2'),
			},
			new ID('Area_2'),
		),
	]);
}
