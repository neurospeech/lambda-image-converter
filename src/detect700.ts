import * as sharp from "sharp";
import * as faceapi from "./common/faceapi";
const faceApi = faceapi as any;
import { Box, FaceDetection } from "@vladmandic/face-api";

import { canvas, faceDetectionNet, faceDetectionOptions, saveFile } from "./common";

export interface IFace {
    score: number;
    box: Box;
}

export default async function detect(input): Promise<IFace[]> {

    await faceApi.tf.setBackend("wasm");

    await faceDetectionNet.loadFromDisk(__dirname + "/../models");

    const { height } = await sharp(input).metadata();
    const scale = height / 700;
    const imgSmall =
        await sharp(input)
        .resize({ height: 700 })
        .png()
        .toBuffer();

    const img: any = await canvas.loadImage(imgSmall);
    const detections: FaceDetection[] = await faceApi.detectAllFaces(img, faceDetectionOptions);
    return detections.map((s) => ({
        score: s.score,
        box: s.box.rescale(scale)
    }));
}
