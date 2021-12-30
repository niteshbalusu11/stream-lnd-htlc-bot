import { Bot } from "grammy";
import * as dotenv from "dotenv";
import data from "./parseJSON.js";
import { appendFileSync, readFileSync } from "fs";
dotenv.config({ path: ".env.local" });
const startBot = async () => {
    let apiKey = process.env.API_KEY;
    if (!apiKey || apiKey === "") {
        throw new Error("404-ExpectedApiKey");
    }
    const bot = new Bot(apiKey);
    console.log("Bot connected, start it by running /start on telegram");
    await bot.api.setMyCommands([
        { command: "start", description: "Start the bot" },
    ]);
    bot.catch((err) => console.error(err));
    bot.start();
    let chatID;
    bot.command("start", async (ctx) => {
        if (typeof ctx?.from?.id !== "number") {
            throw new Error("404-NeedUserID");
        }
        else {
            try {
                const findString = readFileSync(".env.local");
                if (!findString.includes("CHAT_ID=")) {
                    appendFileSync(".env.local", `\nCHAT_ID="${ctx.from.id}"`);
                }
                chatID = !!process.env.CHAT_ID ? process.env.CHAT_ID : ctx.from.id;
                ctx.replyWithChatAction("typing");
                bot.api.sendMessage(chatID, data.bot_is_connected);
            }
            catch (err) {
                console.error(err);
            }
        }
    });
};
export default startBot;
