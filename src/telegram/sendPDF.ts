import fs from "fs";
import * as dotenv from "dotenv";
import imagesToPdf from "images-to-pdf";

dotenv.config({ path: ".env.local" });

const sendImages = async (
  inTempRender: Buffer,
  outTempRender: Buffer,
  inDownRender: Buffer,
  outDownRender: Buffer,
  chatID: number,
  apiKey: string | undefined
) => {
  const fileName = [
    "./example1.png",
    "./example2.png",
    "./example3.png",
    "./example4.png",
  ];

  fs.writeFileSync(fileName[0], inTempRender);
  fs.writeFileSync(fileName[1], outTempRender);
  fs.writeFileSync(fileName[2], inDownRender);
  fs.writeFileSync(fileName[3], outDownRender);

  await imagesToPdf(
    [fileName[0], fileName[1], fileName[2], fileName[3]],
    "./output.pdf"
  );
};

export default sendImages;
