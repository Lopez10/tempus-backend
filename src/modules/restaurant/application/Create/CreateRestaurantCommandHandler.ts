import { CommandHandler } from '@common/domain/CommandHandler';
import { CreateRestaurantCommand } from '../../domain/CreateRestaurantCommand';
import { RestaurantCreator } from './RestaurantCreator';
import { Command } from '@common/domain/Command';
import { Description, Email, ID, Name } from '@common';

export class CreateRestaurantCommandHandler
  implements CommandHandler<CreateRestaurantCommand>
{
  constructor(private restaurantCreator: RestaurantCreator) {}

  suscribedTo(): Command {
    return CreateRestaurantCommand;
  }

  async handle(command: CreateRestaurantCommand): Promise<void> {
    await this.restaurantCreator.run(
      {
        name: new Name(command.name),
        description: new Description(command.description),
        email: new Email(command.email),
      },
      new ID(command.id),
    );
  }
}
