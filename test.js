const { argv } = require("./argv");
const packagejson = require("./package.json");
const {packageVersion} = require('./utils');
const option = {
  output: argv.o || argv.output || "db",
  count: argv.c || argv.count || 1,
  version: argv.v || argv.version,
};

if (option.version) {
  packageVersion();
}
