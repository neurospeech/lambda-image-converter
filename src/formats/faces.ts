import * as sharp from "sharp";
import BaseImage from "../BaseImage";
import detect from "../detect700";

export default class Faces extends BaseImage {

    public async transformAsync(
        input: string): Promise<sharp.Sharp> {

        // create temp with 20% size...
        const faces = await detect(input);
        return faces as any;
      }

}
