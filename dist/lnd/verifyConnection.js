import { lnd } from "../auth/authentication.js";
import { getWalletInfo } from "lightning";
const verifyConnection = async () => {
    try {
        const nodePublicKey = (await getWalletInfo({ lnd })).public_key;
        if (nodePublicKey) {
            return "Connection Successful";
        }
    }
    catch (error) {
        throw new Error("500-Unable to Connect to LND");
    }
};
export default verifyConnection;
