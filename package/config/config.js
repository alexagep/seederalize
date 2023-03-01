
const { Sequelize } = require("sequelize");
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

function fillUpConfigObj(option) {
  console.log('HEREEEEEEEEEEEEEEEEEEEEEEE');
  for (const key in config) {
    if (option[key]) {
      config[key] = option[key];
    }
  }
  // return config;
  console.log(config);
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
      port: config.port,
      logging: config.logging,
    }
  );

  return sequelize
}

module.exports = {fillUpConfigObj} 




// module.exports = config