import * as faceapi from "./common/faceapi";
const faceApi = faceapi as any;
import { FaceDetection } from "@vladmandic/face-api";

import { canvas, faceDetectionNet, faceDetectionOptions, saveFile } from "./common";

export default async function detect(input): Promise<FaceDetection[]> {

  await faceApi.tf.setBackend("wasm");

  await faceApi.tf.ready();

  await faceDetectionNet.loadFromDisk(__dirname + "/../models");

  const img: any = await canvas.loadImage(input);
  const detections = await faceApi.detectAllFaces(img, faceDetectionOptions);

  return detections;
}
