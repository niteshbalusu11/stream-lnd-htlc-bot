import { subscribeToForwards } from "lightning";
import { lnd } from "./auth/authentication.js";
import constructResponse from "./lnd/constructResponse.js";
import startBot from "./telegram/startBot.js";
import sendMessage from "./telegram/sendMessage.js";
import writeToFile from "./telegram/writeToFile.js";
const sub = subscribeToForwards({ lnd });
await startBot();
sub.on("forward", async (forward) => {
    if (!forward) {
        return;
    }
    if (forward.external_failure === "TEMPORARY_CHANNEL_FAILURE") {
        const response = await constructResponse(forward);
        await sendMessage(response, process.env.CHAT_ID);
    }
    if (forward.external_failure !== "" &&
        forward.external_failure !== undefined) {
        writeToFile(forward);
    }
});
