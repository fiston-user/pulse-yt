import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const config = {
  token: process.env.BOT_TOKEN,
  devGuildId: process.env.DEV_GUILD_ID,
};

if (!config.token || !config.devGuildId) {
  throw new Error("Missing some values in .env file");
}
