import path, { dirname } from "path";
// import sqlite3 from "sqlite3";
// import { open } from "sqlite";
import Database from "better-sqlite3";

const createDB = async () => {
  const filePath = path.join(dirname(""), "/failurelogs.db");

  try {
    // const db = await sqlite3.open({
    //   filename: filePath,
    //   driver: sqlite3.Database,
    // });
    const db = new Database(filePath);
    const [tempFailuresTable, downFailuresTable]: any = await createTables(db);
    if (
      db !== undefined &&
      tempFailuresTable !== undefined &&
      downFailuresTable !== undefined
    ) {
      return [db, tempFailuresTable, downFailuresTable];
    }
  } catch (error: any) {
    console.error(error);
  }
};

const createTables = async (db: any) => {
  db.exec(`CREATE TABLE IF NOT EXISTS temp_channel_failures
      (
          failure_time DEFAULT CURRENT_TIMESTAMP,
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

  db.exec(`CREATE TABLE IF NOT EXISTS downstream_failures
      (
        failure_time DEFAULT CURRENT_TIMESTAMP,
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

  const tempFailuresTable = db.prepare(
    "INSERT INTO temp_channel_failures (in_channel, out_channel, in_pubkey, out_pubkey, in_channel_alias, out_channel_alias, tokens, fee, failure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );
  const downFailuresTable = db.prepare(
    "INSERT INTO downstream_failures (in_channel, out_channel, in_pubkey, out_pubkey, in_channel_alias, out_channel_alias, tokens, fee, failure) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );
  return [tempFailuresTable, downFailuresTable];
};

export default createDB;
