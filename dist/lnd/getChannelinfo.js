import { getChannel } from "lightning";
import { lnd } from "../auth/authentication.js";
import walletInfo from "./walletInfo.js";
const getChannelInfo = async (id) => {
    if (!id) {
        throw new Error("404-ExpectedChannelId");
    }
    const channelDetails = await getChannel({ id, lnd });
    const myPubKey = await walletInfo();
    if (!channelDetails) {
        throw new Error("404-ErrorGettingChannelDetails");
    }
    if (!myPubKey) {
        throw new Error("404-ErrorGettingMyPubkey");
    }
    if (myPubKey == channelDetails.policies[0].public_key) {
        return channelDetails.policies[1].public_key;
    }
    else {
        return channelDetails.policies[0].public_key;
    }
};
export default getChannelInfo;
