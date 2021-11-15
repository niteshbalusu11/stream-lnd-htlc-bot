import * as lightning from "lightning";
import getMac from "./get_macaroon.js";
import getCert from "./get_tlsCert.js";

import * as dotenv from "dotenv";
import { AuthenticatedLnd } from "lightning";
dotenv.config({ path: ".env.local" });

let lnd: AuthenticatedLnd = {
  autopilot: undefined,
  chain: undefined,
  default: undefined,
  invoices: undefined,
  router: undefined,
  signer: undefined,
  tower_client: undefined,
  tower_server: undefined,
  wallet: undefined,
  version: undefined,
};

const socket = process.env.SOCKET;
const [mac64, cert64] = await Promise.all([getMac(), getCert()]);

if (!mac64) {
  throw new Error("404-UnableToGetMacaroon");
}
if (!cert64) {
  throw new Error("404-UnableToGetTlsCert");
}

({ lnd } = lightning.authenticatedLndGrpc({
  cert: cert64,
  macaroon: mac64,
  socket: socket,
}));

if (!lnd) {
  throw new Error("404-UnableToGetLndAuthentication");
}

export { lnd };
