import createDB from "./createDB.js";
const readDB = async () => {
    const db = await createDB();
    const in_temp_channel_failures = "SELECT *, count(in_pubkey) FROM temp_channel_failures WHERE failure_time BETWEEN datetime('now', '-6 days') AND datetime('now', 'utc') group by in_pubkey";
    const in_downstream_failures = "SELECT *, count(in_pubkey) FROM downstream_failures WHERE failure_time BETWEEN datetime('now', '-6 days') AND datetime('now', 'utc') group by in_pubkey";
    const out_temp_channel_failures = "SELECT *, count(out_pubkey) FROM temp_channel_failures WHERE failure_time BETWEEN datetime('now', '-6 days') AND datetime('now', 'utc') group by out_pubkey";
    const out_downstream_failures = "SELECT *, count(out_pubkey) FROM downstream_failures WHERE failure_time BETWEEN datetime('now', '-6 days') AND datetime('now', 'utc') group by out_pubkey";
    const in_tempChannelResult = await db[0].all(in_temp_channel_failures);
    console.log(in_tempChannelResult);
    const in_tempChannelResultJSON = JSON.stringify(in_tempChannelResult);
    const in_tempChannelResultParsedJSON = JSON.parse(in_tempChannelResultJSON);
    const in_downChannelResult = await db[0].all(in_downstream_failures);
    const in_downChannelResultJSON = JSON.stringify(in_downChannelResult);
    const in_downChannelResultParsedJSON = JSON.parse(in_downChannelResultJSON);
    const out_tempChannelResult = await db[0].all(out_temp_channel_failures);
    const out_tempChannelResultJSON = JSON.stringify(out_tempChannelResult);
    const out_tempChannelResultParsedJSON = JSON.parse(out_tempChannelResultJSON);
    const out_downChannelResult = await db[0].all(out_downstream_failures);
    const out_downChannelResultJSON = JSON.stringify(out_downChannelResult);
    const out_downChannelResultParsedJSON = JSON.parse(out_downChannelResultJSON);
    return [
        in_tempChannelResultParsedJSON,
        in_downChannelResultParsedJSON,
        out_tempChannelResultParsedJSON,
        out_downChannelResultParsedJSON,
    ];
};
export default readDB;
