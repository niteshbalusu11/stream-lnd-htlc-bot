const insertRecords = async (dbReturn, downStreamresponse) => {
    const tempFailuresTable = dbReturn[1];
    const downFailuresTable = dbReturn[2];
    if (downStreamresponse.external_failure == "TEMPORARY_CHANNEL_FAILURE") {
        await tempFailuresTable.run(downStreamresponse.in_channel, downStreamresponse.out_channel, downStreamresponse.in_pubkey, downStreamresponse.out_pubkey, downStreamresponse.in_channel_alias, downStreamresponse.out_channel_alias, downStreamresponse.tokens, downStreamresponse.fee, downStreamresponse.external_failure);
    }
    else if (downStreamresponse.external_failure === "DOWNSTREAM_FAILURE") {
        await downFailuresTable.run(downStreamresponse.in_channel, downStreamresponse.out_channel, downStreamresponse.in_pubkey, downStreamresponse.out_pubkey, downStreamresponse.in_channel_alias, downStreamresponse.out_channel_alias, downStreamresponse.tokens, downStreamresponse.fee, downStreamresponse.external_failure);
    }
};
export default insertRecords;
