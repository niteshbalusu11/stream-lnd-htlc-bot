import directory from "./lnd_directory.js";
import { join } from "path";
const defaults = [
    ["bitcoin", "litecoin"],
    ["mainnet", "testnet"],
];
const macDirs = ["data", "chain"];
const macName = "admin.macaroon";
import fs from "fs";
const flatten = (arr) => [].concat(...arr);
const getMac = async () => {
    const [chains, nets] = defaults;
    let macaroon;
    let catPath;
    const path = directory();
    if (!path) {
        return new Error("404-UnableToDirectoryPath");
    }
    const all = chains.map((chain) => {
        return nets.map((network) => ({ chain, network }));
    });
    const flat = flatten(all);
    for (var i = 0; i < flat.length; i++) {
        const macPath = []
            .concat(macDirs)
            .concat([flat[i].chain, flat[i].network, macName]);
        catPath = join(...[path].concat(macPath));
        if (fs.existsSync(catPath)) {
            macaroon = fs.readFileSync(catPath, { encoding: "base64" });
            break;
        }
    }
    if (!macaroon) {
        throw new Error("404-UnableToDirectoryPath");
    }
    return macaroon;
};
export default getMac;
