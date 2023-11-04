import { DomainEventSubscriber } from '@common/domain/event/DomainEventSuscriber';
import { RestaurantCreated } from '../../domain/event/RestaurantCreated.event';
import { DomainEventName } from '@common/domain/event/DomainEventName';
import { UpdateDescription } from './UpdateDescription';

export class UpdateDescriptionOnRestaurantCreated
  implements DomainEventSubscriber<RestaurantCreated>
{
  constructor(private readonly updateDescription: UpdateDescription) {}

  subscribedTo(): DomainEventName<RestaurantCreated>[] {
    return [RestaurantCreated];
  }
  async on(domainEvent: RestaurantCreated): Promise<void> {
    await this.updateDescription.run(domainEvent.id);
  }
}
