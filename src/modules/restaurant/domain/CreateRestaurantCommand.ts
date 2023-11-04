import { Command } from '@common/domain/Command';

export class CreateRestaurantCommand extends Command {
  id: string;
  name: string;
  description: string;
  email: string;
  constructor(id: string, name: string, description: string, email: string) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.email = email;
  }
}
