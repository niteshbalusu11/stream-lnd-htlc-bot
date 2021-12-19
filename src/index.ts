import { subscribeToForwards } from "lightning";
import { lnd } from "./auth/authentication.js";
import startBot from "./telegram/startBot.js";
import sendMessage from "./telegram/sendMessage.js";
import writeToFile from "./telegram/writeToFile.js";
import constructDownstreamResponse from "./lnd/constructDownstreamResponse.js";
import verifyConnection from "./auth/verifyConnection.js";

const connectionVerification = await verifyConnection();
if (connectionVerification == "Connection Successful") {
  console.log("Connection Successful");

  const sub = subscribeToForwards({ lnd });

  await startBot();

  sub.on("forward", async (forward) => {
    if (
      !forward ||
      forward.external_failure === "INCORRECT_OR_UNKNOWN_PAYMENT_DETAILS" ||
      forward.internal_failure === "UNKNOWN_INVOICE" ||
      forward.is_confirmed ||
      forward.in_channel === undefined ||
      !forward.in_channel ||
      forward.out_channel === undefined ||
      !forward.out_channel
    ) {
      return;
    } else if (forward.external_failure === "TEMPORARY_CHANNEL_FAILURE") {
      const downStreamresponse = await constructDownstreamResponse(forward);
      writeToFile(downStreamresponse);
      await sendMessage(downStreamresponse, process.env.CHAT_ID!);
    } else if (
      forward.internal_failure === "" ||
      forward.internal_failure === undefined
    ) {
      const downStreamresponse = await constructDownstreamResponse(forward);
      writeToFile(downStreamresponse);
    }
  });

  sub.once("error", (err) => {
    // Terminate subscription and restart after a delay
    sub.removeAllListeners();

    console.error(err);
  });
}
