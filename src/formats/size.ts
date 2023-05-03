import sharp from "sharp";
import BaseImage from "../BaseImage";

export default class Size extends BaseImage {

    public async transformAsync(
        input: string,
        ... args: any[] ): Promise<sharp.Sharp> {

        const size = {
            failOnError: false
        } as any;

        try {

            if (args.length === 0) {
                size.width = 0;
                size.height = 0;
            } else if (args.length === 1) {
                // tslint:disable-next-line: no-bitwise
                size.height = ~~args[0];
            } else {
                const [width, height] = args;
                // tslint:disable-next-line: no-bitwise
                size.width = ~~width;
                // tslint:disable-next-line: no-bitwise
                size.height = ~~height;
                size.fit = "cover";
            }

            if (size.height === 0 || size.width === 0) {
                return await sharp(input);
            }
            return await sharp(input)
            .resize(size);
        } catch (e) {
            const err = `${JSON.stringify(size)}\n${e.stack ? e.stack : e}`;
            throw new Error(err);
        }
    }
}
