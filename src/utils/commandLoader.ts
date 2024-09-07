import { ExtendedClient } from "@/structures/ExtendedClient";
import fs from "fs";
import path from "path";

export function loadCommands(client: ExtendedClient) {
  const commands = [];
  const commandsPath = path.join(__dirname, "../commands");
  const commandCategories = fs.readdirSync(commandsPath);

  for (const category of commandCategories) {
    const categoryPath = path.join(commandsPath, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const commandFiles = fs
        .readdirSync(categoryPath)
        .filter((file) => file.endsWith(".ts"));

      for (const file of commandFiles) {
        const filePath = path.join(categoryPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
          client.commands.set(command.data.name, command);
          commands.push(command.data.toJSON());
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
          );
        }
      }
    }
  }

  return commands;
}
