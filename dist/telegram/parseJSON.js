import fs from "fs";
import path, { dirname } from "path";
const filePath = path.join(dirname(""), "/dist/telegram/interactions.json");
const rawData = fs.readFileSync(filePath);
const data = JSON.parse(rawData.toString());
export default data;
