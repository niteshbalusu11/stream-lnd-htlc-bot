import { Bot } from "grammy";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const startBot = async () => {
  let apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("404-ExpectedApiKey");
  }
  const bot = new Bot(apiKey);
  bot.start();

  let chatID: number;
  bot.command("start", async (ctx) => {
    if (typeof ctx?.from?.id !== "number") {
      throw new Error("404-NeedUserID");
    } else {
      chatID = ctx.from.id;
      process.env.CHAT_ID = chatID.toString();
      bot.api.sendMessage(chatID, "🤖 Yo! I am ready to send notifications!");
    }
  });
  return "Telegram Bot Started, run the /start command";
};
export default startBot;
