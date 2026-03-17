import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data.json");

export function readData() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading data file:", error);
    return null;
  }
}

export function writeData(data: any) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing data file:", error);
    return false;
  }
}
