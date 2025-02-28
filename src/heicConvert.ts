/* eslint-disable no-console */
import { readFile, writeFile } from "fs/promises";
import convert from "heic-convert";
import { file } from "tmp-promise";

export const heicConvert = async (inputFile) => {

    const outputFile = await file({ mode: 0o644, prefix: "tmp-", postfix: ".png" });

    const output = await convert({
        buffer: await readFile(inputFile.path),
        format: "PNG"
    });

    await writeFile(outputFile.path, output);
    return outputFile;
}