import { subscribeToForwards } from "lightning";
import { lnd } from "./auth/authentication.js";
import constructResponse from "./lnd/constructResponse.js";
import startBot from "./telegram/startBot.js";
import sendMessage from "./telegram/sendMessage.js";
const sub = subscribeToForwards({ lnd });

const botStatus = await startBot();
console.log(botStatus);

sub.on("forward", async (forward) => {
  console.log(forward);
  if (!forward || forward.external_failure !== "TEMPORARY_CHANNEL_FAILURE") {
    return;
  }
  const response = await constructResponse(forward);
  // console.log(response);
  await sendMessage(response, process.env.CHAT_ID!);
});
