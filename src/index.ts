import { subscribeToForwards } from "lightning";
import { lnd } from "./auth/authentication.js";
import constructResponse from "./lnd/constructResponse.js";
const sub = subscribeToForwards({ lnd });

sub.on("forward", async (forward) => {
  if (!forward || forward.external_failure !== "TEMPORARY_CHANNEL_FAILURE") {
    return;
  }
  const response = await constructResponse(forward);
  console.log(response);
});
