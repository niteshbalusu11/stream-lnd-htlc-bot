import getChannelInfo from "./getChannelinfo.js";
import getNodeInfo from "./getNodeInfo.js";

interface HtlcObjects {
  tokens: number;
  external_failure: string;
  fee: number;
  in_channel: string;
  out_channel: string;
  at: Date;
}

const constructResponse = async (htlc: HtlcObjects) => {
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
    const response = {
      inNode: inChannelAlias,
      outNode: outChannelAlias,
      tokens: htlc.tokens,
      fee: htlc.fee,
      failure: htlc.external_failure,
      timestamp: htlc.at,
    };

    return response;
  }
};

export default constructResponse;
