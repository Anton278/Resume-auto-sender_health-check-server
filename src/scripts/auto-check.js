import "dotenv/config";
import { Bot } from "grammy";
import fs from "node:fs";

import healthService from "../services/health.js";

const telegramBot = new Bot(process.env.TELEGRAM_BOT_KEY);

async function checkHealth() {
  try {
    const health = await healthService.get();

    if (health.dbConnected === 0) {
      throw new Error("");
    }
  } catch (err) {
    await telegramBot.api.sendMessage(
      process.env.TELEGRAM_ID,
      "‼️ Server has crashed"
    );

    fs.appendFileSync("auto-check-log.txt", err + "\n");
  }
}

checkHealth();
