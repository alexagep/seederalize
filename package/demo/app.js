// const { createFile } = require("../package/src/index");

const { createFile } = require('seederalize')

createFile({
  count: 100,
  output: "db-v",
  username: "postgres",
  password: "ev3VJFD5jAR6b9@",
  database: "mocker",
  host: "localhost",
  dialect: "postgres",
  logging: false,
  port: 5432,
});
