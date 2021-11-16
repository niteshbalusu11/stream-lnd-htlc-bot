import { join } from "path";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const LND_DIR = process.env.LND_DIR;

const certPath = LND_DIR + "tls.cert";

const getCert = async () => {
  const cert = fs.readFileSync(join(certPath), {
    encoding: "base64",
  });

  if (!cert) {
    console.log(new Error("404-ExpectedTlsCert"));
  } else {
    return cert;
  }
};

export default getCert;
