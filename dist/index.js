import { subscribeToForwards } from "lightning";
import { lnd } from "./auth/authentication.js";
import constructResponse from "./lnd/constructResponse.js";
import startBot from "./telegram/startBot.js";
import sendMessage from "./telegram/sendMessage.js";
import writeToFile from "./telegram/writeToFile.js";
import constructDownstreamResponse from "./lnd/constructDownstreamResponse.js";
const sub = subscribeToForwards({ lnd });
await startBot();
sub.on("forward", async (forward) => {
    if (!forward ||
        forward.external_failure === "INCORRECT_OR_UNKNOWN_PAYMENT_DETAILS" ||
        forward.internal_failure === "UNKNOWN_INVOICE" ||
        forward.is_confirmed ||
        forward.in_channel === undefined ||
        !forward.in_channel ||
        forward.out_channel === undefined ||
        !forward.out_channel) {
        return;
    }
    else if (forward.external_failure === "TEMPORARY_CHANNEL_FAILURE") {
        const response = await constructResponse(forward);
        writeToFile(response);
        await sendMessage(response, process.env.CHAT_ID);
    }
    else if (forward.internal_failure === "" ||
        forward.internal_failure === undefined) {
        const response = await constructDownstreamResponse(forward);
        writeToFile(response);
    }
});
