import path, { dirname } from "path";
import { reportError } from "../utils/errorlogging.js";
import { getErrorMessage } from "../utils/errorlogging.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const createDB = async () => {
  const filePath = path.join(dirname(""), "/failurelogs.db");

  try {
    const db = await open({
      filename: filePath,
      driver: sqlite3.Database,
    });
    const [tempFailuresTable, downFailuresTable] = await createTables(db);
    if (
      db !== undefined &&
      tempFailuresTable !== undefined &&
      downFailuresTable !== undefined
    ) {
      return [tempFailuresTable, downFailuresTable];
    }
  } catch (error) {
    reportError({ message: getErrorMessage(error) });
  }
};

const createTables = async (db: any) => {
  await db.exec(`CREATE TABLE IF NOT EXISTS temp_channel_failures
    (
        at TEXT not null,
        in_channel TEXT not null,
        out_channel INTEGER not null,
        in_pubkey TEXT not null,
        out_pubkey TEXT not null,
        in_channel_alias TEXT not null,
        out_channel_alias TEXT not null,
        tokens INTEGER not null,
        fee INTEGER not null,
        failure TEXT not null
    )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS downstream_failures
    (
      at TEXT not null,
      in_channel TEXT not null,
      out_channel INTEGER not null,
      in_pubkey TEXT not null,
      out_pubkey TEXT not null,
      in_channel_alias TEXT not null,
      out_channel_alias TEXT not null,
      tokens INTEGER not null,
      fee INTEGER not null,
      failure TEXT not null
  
    )`);

  const tempFailuresTable = await db.prepare(
    "INSERT INTO temp_channel_failures (at, in_channel, out_channel, in_pubkey, out_pubkey, in_channel_alias, out_channel_alias, tokens, fee, failure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );
  const downFailuresTable = await db.prepare(
    "INSERT INTO downstream_failures (at, in_channel, out_channel, in_pubkey, out_pubkey, in_channel_alias, out_channel_alias, tokens, fee, failure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );

  return [tempFailuresTable, downFailuresTable];
};

await createDB();

export default createDB;
