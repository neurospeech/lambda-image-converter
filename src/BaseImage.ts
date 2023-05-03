import { parse } from "path";
import sharp = require("sharp");
const { file } = require("tmp-promise");
const tmp = require('tmp');

tmp.setGracefulCleanup();

export default abstract class BaseImage {

    public abstract transformAsync(
        input: string,
        ... a: Array<number | string>
        ): Promise<sharp.Sharp>;

    public async transformFileAsync(input: any, ... a: Array<number|string>): Promise<sharp.Sharp> {

        if (typeof input === "string") {
            const parsedPath = parse(input);
            const img = await file({ mode: 0o0644, prefix: "tmp-" , postfix: `${parsedPath.ext}`});
            // rotate...
            await sharp(input).rotate().toFile(img.path);
            return await this.transformAsync(img.path, ... a);
        }
        input = await sharp(input).rotate().toBuffer();
        return await this.transformAsync(input, ... a);
}

}
