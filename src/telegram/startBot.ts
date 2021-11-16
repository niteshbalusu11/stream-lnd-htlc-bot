import { Bot, GrammyError, HttpError } from "grammy";
import * as dotenv from "dotenv";
import data from "./parseJSON.js";
dotenv.config({ path: ".env.local" });

const startBot = async () => {
  let apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "") {
    throw new Error("404-ExpectedApiKey");
  }
  const bot = new Bot(apiKey);
  console.log("Bot connected, start it by running /start on telegram");
  bot.start();

  let chatID: number;
  bot.command("start", async (ctx) => {
    if (typeof ctx?.from?.id !== "number") {
      throw new Error("404-NeedUserID");
    } else {
      chatID = ctx.from.id;
      process.env.CHAT_ID = chatID.toString();
      bot.api.sendMessage(chatID, data.bot_is_connected);
    }
  });
};
export default startBot;
