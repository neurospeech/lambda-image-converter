import sharp from "sharp";
import BaseImage from "../BaseImage";
export default class Circle extends BaseImage {

  public async transformAsync(
    input: string,
    ): Promise<sharp.Sharp> {

    let { width , height } = await sharp(input).metadata();

    if (width > height) {
      width = height;
    } else {
      height = width;
    }

    const midX = width / 2;
    const midY = midX;

    const circle = Buffer.from(
      `<svg><circle cx="${midX}" cy="${midY}" r="${midX}" fill="#ffffff"/></svg>`
    );

    return await sharp(input)
      .resize(width, height, {
          fit: "fill"
      })
      .png()
      .composite([
          {
              input: circle,
              blend: "dest-in"
          }
      ]);
  }

}
