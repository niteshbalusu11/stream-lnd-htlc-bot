import { Bot } from "grammy";
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
    await bot.api.setMyCommands([
        { command: "start", description: "Start the bot" },
        // { command: "report", description: "Generates a failure report" },
    ]);
    bot.start();
    let chatID;
    bot.command("start", async (ctx) => {
        if (typeof ctx?.from?.id !== "number") {
            throw new Error("404-NeedUserID");
        }
        else {
            ctx.replyWithChatAction("typing");
            chatID = ctx.from.id;
            process.env.CHAT_ID = chatID.toString();
            bot.api.sendMessage(chatID, data.bot_is_connected);
        }
    });
    // bot.command("report", async (ctx) => {
    //   let [inTempRender, outTempRender, inDownRender, outDownRender]: Buffer[] =
    //     await chart();
    //   await sendImages(
    //     inTempRender,
    //     outTempRender,
    //     inDownRender,
    //     outDownRender,
    //     chatID,
    //     apiKey
    //   );
    //   ctx.replyWithChatAction("typing");
    //   await ctx.replyWithDocument(new InputFile("./output.pdf"));
    //   fs.unlinkSync("./example1.png");
    //   fs.unlinkSync("./example2.png");
    //   fs.unlinkSync("./example3.png");
    //   fs.unlinkSync("./example4.png");
    //   fs.unlinkSync("./output.pdf");
    // });
};
export default startBot;
