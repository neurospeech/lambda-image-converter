import * as sharp from "sharp";
import BaseImage from "../BaseImage.js";
import detect from "../detect700.js";

export default class Faces extends BaseImage {

    public async transformAsync(
        input: string): Promise<sharp.Sharp> {

        // create temp with 20% size...
        const faces = await detect(input);
        return faces as any;
      }

}
