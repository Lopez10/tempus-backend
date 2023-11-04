import { Command } from './Command';

export interface CommandHandler<T extends Command> {
  suscribedTo(): Command;
  handle(command: T): Promise<void>;
}
