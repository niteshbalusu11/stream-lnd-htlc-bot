import directory from "./lnd_directory.js";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
const environment = process.env.ENVIRONMENT;
const network = process.env.NETWORK;
console.log(environment);
const macDirs = "data/chain";
const macName = "admin.macaroon";
const path = directory();
console.log(path);
const getMac = async () => {
    // const [chains, nets] = defaults;
    // let macaroon;
    // let catPath;
    // const path = directory();
    // if (!path) {
    //   return new Error("404-UnableToDirectoryPath");
    // }
    // catPath = join(...[path].concat(macPath));
    // if (fs.existsSync(catPath)) {
    //   macaroon = fs.readFileSync(catPath, { encoding: "base64" });
    //   break;
    // }
    // if (!macaroon) {
    //   throw new Error("404-UnableToDirectoryPath");
    // }
    // return macaroon;
};
export default getMac;
