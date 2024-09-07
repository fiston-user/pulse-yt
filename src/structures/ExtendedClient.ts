import { Client, ClientOptions, Collection } from "discord.js";

interface Command {
  data: any;
  execute: Function;
}

export class ExtendedClient extends Client {
  commands: Collection<string, Command>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
  }
}
