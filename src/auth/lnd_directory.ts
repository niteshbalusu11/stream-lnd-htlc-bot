import os from "os";
import { join } from "path";
const umbrelPath = "/home/umbrel/umbrel/lnd";
const umbrelUser = "umbrel";
let folderPath;

function directory() {
  if (!os) {
    throw new Error("ExpectedOperatingSytemMethodsToDetermineLndDirectory");
  }

  if (!os.homedir) {
    throw new Error("ExpectedHomedirFunctionToDetermineLndDirectory");
  }

  if (!os.platform) {
    throw new Error("ExpectedPlatformFunctionToDetermineLndDirectory");
  }

  if (!os.userInfo) {
    throw new Error("ExpectedUserInfoFunctionToDetermineLndDirectory");
  }

  if (os.userInfo().username === umbrelUser) {
    folderPath = umbrelPath;
  } else if (os.platform().toLocaleLowerCase() == "darwin") {
    //MacOs
    folderPath = join(os.homedir(), "Library", "Application Support", "Lnd");
  } else if (os.platform().toLocaleLowerCase() == "win32") {
    //Windows
    folderPath = join(os.homedir(), "AppData", "Local", "Lnd");
  } else {
    folderPath = join(os.homedir(), ".lnd");
  }

  return folderPath;
}

export default directory;
