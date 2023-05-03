import sharp from "sharp";
import BaseImage from "../BaseImage";

export default class Size extends BaseImage {

    public async transformAsync(
        input: string,
        left: number,
        top: number,
        width: number,
        height: number): Promise<sharp.Sharp> {

        left = Math.round(left);
        top = Math.round(top);
        width = Math.round(width);
        height = Math.round(height);

        try {

            return await sharp(input)
            .extract({
                left,
                top,
                width,
                height
            });
        } catch (e) {
            const err = `${width},${height}\n${e.stack ? e.stack : e}`;
            throw new Error(err);
        }
    }
}
