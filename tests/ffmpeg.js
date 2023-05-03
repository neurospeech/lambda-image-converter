const test = {
    "url": "https://d2lcywqhfczovm.cloudfront.net/tfs/3/1542295/hnb9dhjhtab9/c90d00c4-469a-4991-834a-9e8fb0456d3c-samplevideo-720x480-30mb.mp4/ios-360p.mp4",
    "output": {
        "thumbnails": [
            {
                "time": 0.5,
                "url": "https://casting800beta.blob.core.windows.net/temp30/1.jpg?sp=w&st=2022-08-04T09:31:03Z&se=2022-08-06T17:31:03Z&spr=https&sv=2021-06-08&sr=c&sig=%2BamS0zGZVU8WOoIJWjLeJNRwjNwcsM3NyV18L%2Fjp8WM%3D"
            }
        ]
    }
};

const FFMpeg = require("../dist/ff/FFMpeg").default
FFMpeg.thumbnails(test.url, test.output.thumbnails)
    .then((r) => console.log(r))
    .catch((e) => console.error(e));
