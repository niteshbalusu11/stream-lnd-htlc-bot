import path from "path";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const lnd_dir = process.env.LND_DIR!;

const certPath = path.join(lnd_dir, "tls.cert");

const getCert = async () => {
  const cert = fs.readFileSync(certPath, {
    encoding: "base64",
  });

  if (!cert) {
    throw new Error("404-ExpectedTlsCert");
  } else {
    return cert;
  }
};

export default getCert;
