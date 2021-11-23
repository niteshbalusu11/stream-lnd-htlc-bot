import { lnd } from "../auth/authentication.js";
import { getWalletInfo } from "lightning";

const verifyConnection = async () => {
  try {
    const nodePublicKey = (await getWalletInfo({ lnd })).public_key;

    if (nodePublicKey) {
      return "Connection Successful";
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default verifyConnection;
