// tslint:disable: no-bitwise
import * as sharp from "sharp";
import BaseImage from "../BaseImage";
import detect from "../detect";

export default class Headshot extends BaseImage {

    public async transformAsync(
        input: string): Promise<sharp.Sharp> {

        // create temp with 20% size...
        const originalSize = await sharp(input).metadata();
        let {
            width,
            height
        } = originalSize;

        if (width > height) {
            width = height;
        } else {
            height = width;
        }

        const center = width / 2;
        const circle = Buffer.from(
            `<svg width="${width}" height="${height}">
                <circle cx="${center}" cy="${center}" r="${center}" fill="#ffffff"/>
            </svg>`
        );

        const faces = await detect(input);
        if (faces?.length === 1) {

            // extract with keeping face in center...
            // const face = faces.sort((a, b) => a.score === b.score ? 0 : (
            //     a.score > b.score
            //     ? 1
            //     : -1
            // ))[0];
            const face = faces[0];

            const headshotHeight = face.box.height * 2 / 1.4;
            const headshotWidth = headshotHeight;
            const headshotLeft = Math.max(0, ~~((face.box.left + face.box.width / 2) - (headshotWidth / 2)));
            const headshotTop = Math.max(0, ~~((face.box.top + face.box.height / 2) - (headshotHeight / 2)));

            const rect = {
                left: headshotLeft,
                top : headshotTop,
                width: Math.min( originalSize.width - headshotLeft, ~~headshotWidth),
                height: Math.min( originalSize.height - headshotTop, ~~headshotHeight)
            };

            // tslint:disable-next-line: no-console
            console.log({
                originalFace: face.box,
                rect,
                imageSize: {
                    height: originalSize.height,
                    width: originalSize.width
                }
            });

            const size = rect.width;
            const radius = size / 2;

            return await sharp(input)
                .extract(rect)
                .composite([
                    {
                        input: Buffer.from(
                            `<svg width="${size}" height="${size}">
                                <circle cx="${radius}" cy="${radius}" r="${radius}" fill="#ffffff"/>
                            </svg>`
                        ),
                        blend: "dest-in"
                    }
                ])
                .png();
        }

        return await sharp(input)
        .resize(width, height, {
            fit: sharp.fit.cover,
            position: sharp.strategy.attention
        })
        .composite([
            {
                input: circle,
                blend: "dest-in"
            }
        ])
        .png();
      }

}
