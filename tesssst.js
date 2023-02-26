
const { Sequelize } = require("sequelize");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;


const config = {
  username: argv.u || argv.user || "postgres",
  password: argv.x || argv.pass || "postgres",
  database: argv.d || argv.database || "mocker",
  host: argv.h || argv.host || "localhost",
  dialect: "postgres",
  logging: false,
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "postgres",
  }
);