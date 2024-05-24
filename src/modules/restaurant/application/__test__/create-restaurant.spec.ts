import {
	CreateRestaurantDto,
	CreateRestaurantUseCase,
	RestaurantRepositoryPort,
} from "@modules";
import { RestaurantMockRepository } from "../../infrastructure/__test__/restaurant.mock.repository";

describe("Create Restaurant Use Case", () => {
	it(`
        GIVEN a restaurant data
        WHEN I call to the use case to create a restaurant
        THEN the restaurant should be created with the correct data
    `, async () => {
		const restaurantReposistory: RestaurantRepositoryPort =
			new RestaurantMockRepository();
		const action = new CreateRestaurantUseCase(restaurantReposistory);

		// GIVEN
		const restaurantRequestData: CreateRestaurantDto = {
			name: "Restaurant 1",
			description: "Restaurant 1 description",
			email: "restaurant1@gmail.com",
			capacity: 10,
		};

		// WHEN
		const restaurantCreated = await action.run(restaurantRequestData);

		// THEN
		expect(restaurantCreated.propsCopy.name.value).toEqual("Restaurant 1");
		expect(restaurantCreated.propsCopy.description.value).toEqual(
			"Restaurant 1 description",
		);
		expect(restaurantCreated.propsCopy.email.value).toEqual(
			"restaurant1@gmail.com",
		);
	});
});
