import fs from "fs";
import path, { dirname } from "path";
const filePath = path.join(dirname(""), "/failurelogs.json");
const writeToFile = async (forward) => {
    try {
        if (fs.existsSync(filePath)) {
            addData(forward);
        }
        else {
            const json = JSON.stringify(forward);
            fs.writeFileSync(filePath, json, "utf-8");
        }
    }
    catch (err) {
        throw new Error("Unable to create/write to JSON file  " + err);
    }
};
const addData = (forward) => {
    const data = fs.readFileSync(filePath, "utf-8");
    const json = JSON.stringify(forward);
    let obj = data + "\n \n" + json;
    fs.writeFileSync(filePath, obj, "utf-8");
};
export default writeToFile;
