import * as faceApi from "./faceapi";

const faceapi = faceApi as any;

export const faceDetectionNet = faceapi.nets.ssdMobilenetv1;
// export const faceDetectionNet = faceapi.nets.tinyFaceDetector;

// SsdMobilenetv1Options
const minConfidence = 0.5;

// TinyFaceDetectorOptions
const inputSize = 448;
const scoreThreshold = 0.5;

function getFaceDetectorOptions(net) {
  return net === faceapi.nets.ssdMobilenetv1
    ? new faceapi.SsdMobilenetv1Options({ minConfidence })
    : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold });
}

export const faceDetectionOptions = getFaceDetectorOptions(faceDetectionNet);
