import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
const environment = process.env.ENVIRONMENT;
const network = process.env.NETWORK;
const lnd_dir = process.env.LND_DIR;
const macPath = lnd_dir + "data/chain/" + network + "/" + environment + "/admin.macaroon";
const getMac = async () => {
    const macaroon = fs.readFileSync(macPath, { encoding: "base64" });
    if (!macaroon) {
        throw new Error("404-ExpectedMacaroon");
    }
    return macaroon;
};
export default getMac;
