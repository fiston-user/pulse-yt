import { config } from "@/config";
import { ExtendedClient } from "@/structures/ExtendedClient";
import { loadCommands } from "@/utils/commandLoader";
import { Client, Events, REST, Routes } from "discord.js";

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client: ExtendedClient) {
    try {
      console.log(`Ready! Logged in as ${client.user?.tag}`);

      const commands = loadCommands(client);

      const categories = new Set(
        client.commands.map((cmd) => cmd.data.name.split("/")[0])
      );
      for (const category of categories) {
        const categoryCommands = client.commands.filter((cmd) =>
          cmd.data.name.startsWith(category)
        );
        console.log(`Loaded ${categoryCommands.size} commands in ${category}`);
      }

      const rest = new REST().setToken(config.token!);

      console.log("Started refreshing application (/) commands.");

      if (process.env.NODE_ENV === "development") {
        await rest.put(
          Routes.applicationGuildCommands(client.user!.id, config.devGuildId!),
          {
            body: commands,
          }
        );
        console.log(
          "Successfully reloaded application (/) commands for dev guild."
        );
      } else {
        await rest.put(Routes.applicationCommands(client.user!.id), {
          body: commands,
        });
        console.log("Successfully reloaded application (/) commands.");
      }
    } catch (error) {
      console.error(error);
    }
  },
};
