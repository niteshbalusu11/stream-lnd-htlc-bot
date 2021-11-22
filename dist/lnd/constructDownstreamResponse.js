import getChannelInfo from "./getChannelinfo.js";
import getNodeInfo from "./getNodeInfo.js";
const constructDownstreamResponse = async (htlc) => {
    const [inChannelPubkey, outChannelPubkey] = await Promise.all([
        getChannelInfo(htlc.in_channel),
        getChannelInfo(htlc.out_channel),
    ]);
    const [inChannelAlias, outChannelAlias] = await Promise.all([
        getNodeInfo(inChannelPubkey),
        getNodeInfo(outChannelPubkey),
    ]);
    if (!inChannelAlias ||
        !inChannelPubkey ||
        !outChannelAlias ||
        !outChannelPubkey) {
        throw new Error("404-Expected: Alias, Pubkey");
    }
    else {
        if (htlc.external_failure !== "TEMPORARY_CHANNEL_FAILURE") {
            htlc.external_failure = "DOWNSTREAM_FAILURE";
        }
        htlc.in_channel_alias = inChannelAlias;
        htlc.out_channel_alias = outChannelAlias;
        htlc.in_pubkey = inChannelPubkey;
        htlc.out_pubkey = outChannelPubkey;
        return htlc;
    }
};
export default constructDownstreamResponse;
