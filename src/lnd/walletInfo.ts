import { getWalletInfo } from "lightning";
import { lnd } from "../auth/authentication.js";

const walletInfo = async () => {
  const nodePublicKey = (await getWalletInfo({ lnd })).public_key;

  if (!nodePublicKey) {
    throw new Error("404-ExpectedYourNodePublicKey");
  }

  return nodePublicKey;
};

export default walletInfo;
