const { Sequelize } = require("sequelize");


// const config = require('./config');


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

// console.log(config);

module.exports = { sequelize };
