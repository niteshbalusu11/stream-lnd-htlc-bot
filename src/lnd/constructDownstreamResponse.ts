import getChannelInfo from "./getChannelinfo.js";
import getNodeInfo from "./getNodeInfo.js";

interface HtlcObjects {
  in_channel: string;
  out_channel: string;
}

const constructDownstreamResponse = async (htlc: HtlcObjects) => {
  const [inChannelPubkey, outChannelPubkey] = await Promise.all([
    getChannelInfo(htlc.in_channel),
    getChannelInfo(htlc.out_channel),
  ]);

  const [inChannelAlias, outChannelAlias] = await Promise.all([
    getNodeInfo(inChannelPubkey),
    getNodeInfo(outChannelPubkey),
  ]);

  if (
    !inChannelAlias ||
    !inChannelPubkey ||
    !outChannelAlias ||
    !outChannelPubkey
  ) {
    throw new Error("404-Expected: Alias, Pubkey");
  } else {
    htlc.in_channel = inChannelAlias;
    htlc.out_channel = outChannelAlias;
    return htlc;
  }
};

export default constructDownstreamResponse;
