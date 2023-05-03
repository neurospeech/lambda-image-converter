const FFProbe = require("../dist/ff/FFProbe").default

FFProbe.probe("https://d2lcywqhfczovm.cloudfront.net/tfs/3/1542295/hnb9dhjhtab9/c90d00c4-469a-4991-834a-9e8fb0456d3c-samplevideo-720x480-30mb.mp4/ios-360p.mp4", "probe")
    .then((x) => console.log(x))
    .catch((e) => console.error(e));