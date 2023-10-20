import * as mime from "mime-types";
import { BlockBlobClient } from "@azure/storage-blob";
import { existsSync, promises } from "fs";
import fetch from "node-fetch";
import { file } from "tmp-promise";

interface ICommandInput {
    url: string;
    filePath: string;
}


export default class App {

    static async run(x) {
        try {
            return await this.runInternal(x);
        } catch (error) {
            console.error(`failed for ${JSON.stringify(x)}`);
            console.error(error);
            throw error;
        }
    }

    static async runInternal({format, url, extension, output}) {
        let fileName = format;
        let matches = format.match(/(\w+)\(([^\)]+)\)/);
        let args = [];
        if (matches) {
            fileName = matches[1];
            args = matches[2].split(',').map( (x) => parseFloat(x) );
            switch(format) {
                case "jpg":
                case "png":
                case "gif":
                case "webp":
                case "ico":
                    fileName = "size";
                    break;
            }
        }

        const rs = await fetch(url);
        if (rs.status >= 400) {
            // error...
            throw new Error(`${rs.statusText}\r\n${await rs.text()}`);
        }
        const input = await rs.buffer();


        let t = await file({ mode: 0o644, prefix: "tmp-" , postfix: extension});

        
        var templateClass  = require("../dist/formats/" + fileName).default;

        var template = new (templateClass)();

        let r = await template.transformFileAsync(input, ... args);

        switch(extension) {
            case ".jpg":
                r = r.jpeg({ quality: 95});
                break;
            case ".png":
                r = r.png({
                    compressionLevel: 9
                });
                break;
            case ".webp":
                r = r.webp({
                    nearLossless: true,
                    quality: 95
                });
                break;
            case ".gif":
                r = r.gif();
                break;
        }

        if (r.toFile) {
            await r.toFile(t.path);

            // save to url...
            await this.upload({ url: output, filePath: t.path });

            r = `"Done"`
        }

        return r;
    }

    static async upload(x: ICommandInput) {
        if (!existsSync(x.filePath)) {
            console.log(`File ${x.filePath} does not exist.`);
            return;
        }
        if (!x.url) {
            console.log(`Cannot upload ${x.filePath} as upload url is empty.`);
            return;
        }
        if (x.url.includes(".blob.core.windows.net")) {
            // use put...
            return this.uploadAzure(x);
        }
        console.log(`File ${x.url} not supported for upload.`);
    }
    
    static async uploadAzure({url, filePath}: ICommandInput) {
        console.log(`Uploading ${url}`);
    
        const blobContentType = mime.lookup(filePath);
    
        var b = new BlockBlobClient(url);
        await b.uploadFile(filePath, {
            blobHTTPHeaders: {
                blobContentType,
                blobCacheControl: "public, max-age=3240000"
            }
        });
        try {
            await promises.unlink(filePath);
        } catch {
            // do nothing...
        }
    
    }
}
