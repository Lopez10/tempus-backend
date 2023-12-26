import { RestaurantCreated } from '../domain/events/RestaurantCreated';
import { DomainEvents, Handle } from '@common';

export class AfterRestaurantCreated implements Handle<RestaurantCreated> {
  // private useCaseExample: UseCaseExample;
  constructor() {
    // useCaseExample: UseCaseExample,
    // this.useCaseExample = useCaseExample;
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.onRestaurantCreated.bind(this),
      RestaurantCreated.name,
    );
  }

  private async onRestaurantCreated(event: RestaurantCreated): Promise<void> {
    // const { restaurant } = event;

    try {
      // await this.useCaseExample.execute(restaurant);
      // console.log(
      // `[AfterRestaurantCreated]: Successfully executed UseCaseExample after RestaurantCreated event.`,
      // );
    } catch (err) {
      // console.log(
      //   `[AfterRestaurantCreated]: Failed to execute UseCaseExample after RestaurantCreated event.`,
      // );
    }
  }
}
