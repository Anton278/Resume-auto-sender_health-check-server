import "dotenv/config";
import { Bot } from "grammy";

import healthService from "../services/health.js";

const telegramBot = new Bot(process.env.TELEGRAM_BOT_KEY);

async function onHealthCheck(ctx) {
  try {
    const health = await healthService.get();

    if (health.dbConnected === 0) {
      throw new Error("");
    }

    await telegramBot.api.sendMessage(
      process.env.TELEGRAM_ID,
      "✅ Server is up and running"
    );
  } catch (err) {
    console.log(err);
    await telegramBot.api.sendMessage(
      process.env.TELEGRAM_ID,
      "‼️ Server has crashed"
    );
  }
}

telegramBot.command("health_check", onHealthCheck);

telegramBot.api.setMyCommands([
  { command: "health_check", description: "Check server's health" },
]);

try {
  telegramBot.start();
  console.log("running...");
} catch (err) {
  console.log(err);
}
