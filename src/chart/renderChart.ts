import { ChartCallback, ChartJSNodeCanvas } from "chartjs-node-canvas";
import { ChartConfiguration } from "chart.js";

const renderChart = async (
  failureAlias: [],
  failureCount: [],
  label: string
) => {
  const width = 500;
  const height = 500;
  const configuration: ChartConfiguration = {
    type: "bar",
    data: {
      labels: failureAlias,
      datasets: [
        {
          label: label,
          data: failureCount,
          backgroundColor: [
            "rgba(222, 30, 30, 0.8)",
            "rgba(30, 64, 222, 0.8)",
            "rgba(206, 9, 237, 0.8)",
            "rgba(8, 148, 163, 1)",
            "rgba(59, 203, 19, 1)",
            "rgba(218, 230, 10, 1)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Failure Count",
          padding: {
            top: 10,
            bottom: 30,
          },
        },
      },
    },
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
  const chartCallback: ChartCallback = (ChartJS) => {
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
