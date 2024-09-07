import { GatewayIntentBits } from "discord.js";
import { config } from "@/config";
import { loadEvents } from "@/utils/eventLoader";
import { loadCommands } from "@/utils/commandLoader";
import { ExtendedClient } from "@/structures/ExtendedClient";

const client = new ExtendedClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});

loadEvents(client);
loadCommands(client);

client.login(config.token);
