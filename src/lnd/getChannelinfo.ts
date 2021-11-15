import { getChannel } from "lightning";
import { lnd } from "../auth/authentication.js";
import getNodeInfo from "./getNodeInfo.js";

const getChannelInfo = async (id: string) => {
  if (!id) {
    throw new Error("404-ExpectedChannelId");
  }

  const channelDetails = await getChannel({ id, lnd });
  const pubkey = channelDetails.policies[0].public_key;
  return pubkey;
};

export default getChannelInfo;
