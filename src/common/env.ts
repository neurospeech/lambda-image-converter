// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
// import '@tensorflow/tfjs-node';
// import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-wasm";
import * as faceapi from "./faceapi";

// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
import canvas = require("canvas");

// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
const { Canvas, Image, ImageData } = canvas as any;
(faceapi as any).env.monkeyPatch({ Canvas, Image, ImageData });

export { canvas };
