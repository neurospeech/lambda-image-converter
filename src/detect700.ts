import sharp from "sharp";
import faceapi from "./common/faceapi.js";
import { Box, FaceDetection } from "@vladmandic/face-api";

import { canvas, faceDetectionNet, faceDetectionOptions } from "./common/index.js";

export interface IFace {
    score: number;
    box: Box;
}

export default async function detect(input): Promise<IFace[]> {

    await faceapi.tf.setBackend("wasm");

    await faceDetectionNet.loadFromDisk(import.meta.dirname + "/../models");

    const { height } = await sharp(input).metadata();
    const scale = height / 700;
    const imgSmall =
        await sharp(input)
        .resize({ height: 700 })
        .png()
        .toBuffer();

    const img: any = await canvas.loadImage(imgSmall);
    const detections: FaceDetection[] = await faceapi.detectAllFaces(img, faceDetectionOptions);
    return detections.map((s) => ({
        score: s.score,
        box: s.box.rescale(scale)
    }));
}
