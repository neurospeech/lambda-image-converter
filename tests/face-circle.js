var hs  = require("../index").default;

hs((failed, success) => {
    if (failed) {
        console.error(failed);
        return;
    }
    console.log("done");
}, {
    name: "face-circle",
    input:  __dirname + "./samples/simmi.jpg",
    output: __dirname + "./samples/face-circle.png"
});

// h.transformAsync( __dirname + "./samples/simmi.jpg", __dirname + "./samples/face-circle").then((c) => {
//     console.log("done");
// }).catch((e) => {
//     console.error(e);
// });
