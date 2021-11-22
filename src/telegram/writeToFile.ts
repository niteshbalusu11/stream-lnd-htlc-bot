import fs from "fs";
import path, { dirname } from "path";
import { Forward } from "../utils/typeExport.js";

const filePath = path.join(dirname(""), "/failurelogs.json");

const writeToFile = async (forward: Forward) => {
  let flag: boolean;
  try {
    if (fs.existsSync(filePath)) {
      flag = true;
    } else {
      flag = false;
    }
    addData(forward, flag);
  } catch (err) {
    throw new Error("Unable to create/write to JSON file  " + err);
  }
};

const addData = (forward: Forward, flag: boolean) => {
  let obj = {
    table: [{}],
  };

  if (flag) {
    const data = fs.readFileSync(filePath, "utf-8");
    if (data.length !== 0) {
      obj = JSON.parse(data);
    }

    obj.table.push({
      at: forward.at,
      inchannel: forward.in_channel,
      outchannel: forward.out_channel,
      inchannel_pubkey: forward.in_pubkey,
      outchannel_pubkey: forward.out_pubkey,
      inchannel_alias: forward.in_channel_alias,
      outchannel_alias: forward.out_channel_alias,
      tokens: forward.tokens,
      fee: forward.fee,
      failure: forward.external_failure,
    });
  } else {
    obj.table.push({
      at: forward.at,
      inchannel: forward.in_channel,
      outchannel: forward.out_channel,
      inchannel_pubkey: forward.in_pubkey,
      outchannel_pubkey: forward.out_pubkey,
      inchannel_alias: forward.in_channel_alias,
      outchannel_alias: forward.out_channel_alias,
      tokens: forward.tokens,
      fee: forward.fee,
      failure: forward.external_failure,
    });
  }
  const json = JSON.stringify(obj, null, 4);
  fs.writeFileSync(filePath, json, "utf-8");
};

export default writeToFile;
