import readDB from "../sqllite/readDB.js";
import renderChart from "./renderChart.js";
const chart = async () => {
    let in_tempFailureAlias = [];
    let in_tempFailureCount = [];
    let out_tempFailureAlias = [];
    let out_tempFailureCount = [];
    let in_downFailureAlias = [];
    let in_downFailureCount = [];
    let out_downFailureAlias = [];
    let out_downFailureCount = [];
    const [in_readTempFailures, in_readDownFailures, out_readTempFailures, out_readDownFailures,] = await readDB();
    for (let i = 0; i < in_readTempFailures.length; i++) {
        in_tempFailureAlias.push(in_readTempFailures[i].in_channel_alias);
        in_tempFailureCount.push(in_readTempFailures[i]["count(in_pubkey)"]);
    }
    for (let i = 0; i < out_readTempFailures.length; i++) {
        out_tempFailureAlias.push(out_readTempFailures[i].out_channel_alias);
        out_tempFailureCount.push(out_readTempFailures[i]["count(out_pubkey)"]);
    }
    for (let i = 0; i < in_readTempFailures.length; i++) {
        in_downFailureAlias.push(in_readDownFailures[i].in_channel_alias);
        in_downFailureCount.push(in_readDownFailures[i]["count(in_pubkey)"]);
    }
    for (let i = 0; i < in_readTempFailures.length; i++) {
        out_downFailureAlias.push(out_readDownFailures[i].out_channel_alias);
        out_downFailureCount.push(out_readDownFailures[i]["count(out_pubkey)"]);
    }
    const [inTempRender, outTempRender, inDownRender, outDownRender] = await Promise.all([
        renderChart(in_tempFailureAlias, in_tempFailureCount, "In Temp Channel Failures"),
        renderChart(out_tempFailureAlias, out_tempFailureCount, "Out Temp Channel Failures"),
        renderChart(in_downFailureAlias, in_downFailureCount, "In Downstream Channel Failures"),
        renderChart(out_downFailureAlias, out_downFailureCount, "Out Downstream Channel Failures"),
    ]);
    return [inTempRender, outTempRender, inDownRender, outDownRender];
};
export default chart;
