import faceapi from "./common/faceapi.js";
import { FaceDetection } from "@vladmandic/face-api";

import { canvas, faceDetectionNet, faceDetectionOptions } from "./common/index.js";

export default async function detect(input): Promise<FaceDetection[]> {

  await faceapi.tf.setBackend("wasm");

  await faceapi.tf.ready();

  await faceDetectionNet.loadFromDisk(import.meta.dirname + "/../models");

  const img: any = await canvas.loadImage(input);
  const detections = await faceapi.detectAllFaces(img, faceDetectionOptions);

  return detections;
}
