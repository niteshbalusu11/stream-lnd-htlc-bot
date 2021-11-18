import { getWalletInfo } from "lightning";
import { lnd } from "../auth/authentication.js";
const walletInfo = async () => {
    const nodePublicKey = (await getWalletInfo({ lnd })).public_key;
    return nodePublicKey;
};
export default walletInfo;
