const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

fs.watch("./", (eventType, filename) => {
  if (filename) {
    const extension = path.parse(filename).ext;
    console.log(".ejs changed: " + filename);

    if (extension === ".ejs") {
      exec(
        'ejs-cli --base-dir ./ "index.ejs" --out ../docs',
        (err, stdout, stderr) => {
          if (err) {
            return console.error(err);
          }

          console.log(stdout);

          if (stderr) {
            console.log(stderr);
          }
        }
      );
    }
  }
});
