import directory from "./lnd_directory.js";
const certPath = ["tls.cert"];
import { join } from "path";
import fs from "fs";
const getCert = async () => {
    const certDir = directory();
    const cert = fs.readFileSync(join(...[certDir].concat(certPath)), {
        encoding: "base64",
    });
    if (!cert) {
        console.log(new Error("404-UnableToGetTlsCert"));
    }
    else {
        return cert;
    }
};
export default getCert;
