import { lnd } from "../auth/authentication.js";
import { getNode } from "lightning";
const getNodeInfo = async (public_key) => {
    if (!public_key)
        throw new Error("404-ExpectedPublicKey");
    const getNodeInfo = await getNode({
        is_omitting_channels: true,
        public_key,
        lnd,
    });
    const alias = getNodeInfo.alias;
    return alias;
};
export default getNodeInfo;
