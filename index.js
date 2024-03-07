import "dotenv/config";
import { Bot } from "grammy";

import { api } from "./src/http/api.js";

const telegramBot = new Bot(process.env.TELEGRAM_BOT_KEY);

async function getHealth() {
  const res = await api.get("/health");
  return res.data;
}

async function checkHealth() {
  try {
    const health = await getHealth();
    if (health.dbConnected === 0) {
      throw new Error("");
    }
  } catch (err) {
    await telegramBot.api.sendMessage(
      process.env.TELEGRAM_ID,
      "Server has crashed"
    );
  }
}

checkHealth();
