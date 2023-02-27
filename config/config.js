
const { argv } = require("../utils/argv");

const config = {
  username: argv.u || argv.user || "postgres",
  password: argv.x || argv.pass || "postgres",
  database: argv.d || argv.database || "mocker",
  host: argv.h || argv.host || "localhost",
  dialect: argv.e || argv.engine || "postgres",
  logging: argv.l || argv.logging || false,
  port: argv.p || argv.port || 5432,
};



module.exports = config