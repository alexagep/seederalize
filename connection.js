const { Sequelize } = require("sequelize");


const { argv } = require("./argv");


const config = {
  username: argv.u || argv.user || "postgres",
  password: argv.x || argv.pass || "postgres",
  database: argv.d || argv.database || "mocker",
  host: argv.h || argv.host || "localhost",
  dialect: argv.e || argv.engine || "postgres",
  logging: false,
  port: argv.p || argv.port || 5432,
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: false,
  }
);

module.exports = { sequelize };
