var hs  = require("../index").default;

hs((failed, success) => {
    if (failed) {
        console.error(failed);
        return;
    }
    console.log("done");
}, {
    name: "size(100)",
    input: __dirname + "./samples/1.jpg",
    output: __dirname + "./samples/output.png"
});
