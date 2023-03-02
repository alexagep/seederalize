
const { argv } = require("../utils/argv");

const config = {
  output: argv.o || argv.output || "db",
  count: argv.c || argv.count || 1,
  username: argv.u || argv.user || "",
  password: argv.x || argv.pass || "",
  database: argv.d || argv.database || "",
  host: argv.h || argv.host || "localhost",
  dialect: argv.e || argv.engine || "postgres",
  logging: argv.l || argv.logging || false,
  port: argv.p || argv.port || 5432
}

module.exports = config