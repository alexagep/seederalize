// require('../package/src/server');


// console.log(seederalize.createFile({count: 2, output: 'gateway'}));

const { createFile } = require('../package/src/server');

createFile({
    count: 2,
    output : 'db-v-2',
    username: 'postgres',
    password: 'ev3VJFD5jAR6b9@',
    database: 'mocker',
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    port: 5432
  })