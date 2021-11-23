import { ChartJSNodeCanvas } from "chartjs-node-canvas";
const renderChart = async (failureAlias, failureCount, label) => {
    const width = 500;
    const height = 500;
    const configuration = {
        type: "bar",
        data: {
            labels: failureAlias,
            datasets: [
                {
                    label: label,
                    xAxisID: "Alias",
                    yAxisID: "Failure Count",
                    data: failureCount,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255,99,132,1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {},
        plugins: [
            {
                id: "background-colour",
                beforeDraw: (chart) => {
                    const ctx = chart.ctx;
                    ctx.save();
                    ctx.fillStyle = "white";
                    ctx.fillRect(0, 0, width, height);
                    ctx.restore();
                },
            },
        ],
    };
    const chartCallback = (ChartJS) => {
        ChartJS.defaults.responsive = true;
        ChartJS.defaults.maintainAspectRatio = false;
    };
    const chartJSNodeCanvas = new ChartJSNodeCanvas({
        width,
        height,
        chartCallback,
    });
    const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
    return buffer;
};
export default renderChart;
