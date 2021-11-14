import { join } from "path";
import { URL } from "url";
import directory from "./lnd_directory.js";
import fs from "fs";
import { parse } from "ini";
const applicationOptions = "Application Options";
const confPath = ["lnd.conf"];
const { keys } = Object;
const scheme = "rpc://";
const getSocket = async () => {
    const path = directory();
    if (!path) {
        return new Error("UnableToGetDirectoryofConfFile");
    }
    const getConfFile = fs.readFileSync(join(...[path].concat(confPath)));
    if (!getConfFile) {
        return new Error("UnableToGetConfFile");
    }
    const conf = parse(getConfFile.toString());
    if (!keys(conf).length) {
        return new Error("ExpectedConfigurationInfoFromConfigFile");
    }
    const { tlsextradomain } = conf[applicationOptions] || {};
    if (!tlsextradomain) {
        return new Error("UnableToParseConfFile");
    }
    const url = `${scheme}${conf[applicationOptions].rpclisten}`;
    const { port } = new URL(url);
    const socket = `${tlsextradomain}:${port}`;
    if (!socket) {
        return new Error("UnableToGetSocket");
    }
    return socket;
};
export default getSocket;
