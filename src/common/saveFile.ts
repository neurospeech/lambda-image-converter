import fs from "fs";
import path from "path";

const baseDir = path.resolve(import.meta.dirname, "../out");

export function saveFile(fileName: string, buf: Buffer) {
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }

  fs.writeFileSync(path.resolve(baseDir, fileName), buf);
}
