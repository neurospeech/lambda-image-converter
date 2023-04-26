const sharp = require("sharp");

function run() {
    return sharp("./tests/samples/input.svg")
        .png().toFile("./a.png")
}

run().then(console.log, console.error);
