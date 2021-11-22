import { FailureData } from "../utils/typeExport.js";
import { ChartCallback, ChartJSNodeCanvas } from "chartjs-node-canvas";
import fs from "fs";
import path, { dirname } from "path";
import { ChartConfiguration } from "chart.js";

const chart = async (failureData: FailureData) => {
  const downFailureLength = failureData.returnValue.downFailures;
  console.log(downFailureLength);

  const width = 400;
  const height = 400;

  console.log(failureData.returnValue.downFailures);

  const configuration: ChartConfiguration = {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
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

  const chartCallback: ChartCallback = (ChartJS) => {
    ChartJS.defaults.responsive = true;
    ChartJS.defaults.maintainAspectRatio = false;
  };
  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width,
    height,
    chartCallback,
  });
  //   const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
  //   fs.writeFileSync("./example.png", buffer, "base64");
};

export default chart;
