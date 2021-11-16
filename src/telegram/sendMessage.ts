import { Bot } from "grammy";
import * as dotenv from "dotenv";
import data from "./parseJSON.js";
dotenv.config({ path: ".env.local" });

interface Response {
  inNode: string;
  outNode: string;
  tokens: number;
  fee: number;
  failure: string;
  timestamp: Date;
}

const sendMessage = async (response: Response, chatID: string) => {
  let apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("404-ExpectedApiKey");
  }
  const bot = new Bot(apiKey);
  const telegramResponse = constructResponse(response);
  bot.api.sendMessage(chatID, telegramResponse, { parse_mode: "HTML" });
};

function constructResponse(response: Response): string {
  const inPeer = data.in_peer;
  const outPeer = data.out_peer;
  const timeStamp = data.timestamp;
  const fee = data.fee;
  const tokens = data.forward_amount;

  const html = `<b>Failed Forward: </b>\n\n${timeStamp} ${response.timestamp}\n\n${inPeer} ${response.inNode}\n\n${outPeer} ${response.outNode}\n\n${tokens} ${response.tokens}\n\n${fee} ${response.fee}`;

  return html;
}

export default sendMessage;
