import { lnd } from "./auth/authentication";
import { subscribeToForwards } from "lightning";

const sub = subscribeToForwards({ lnd });

sub.on("forward", async (forward) => {
  console.log(forward);
});
