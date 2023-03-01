const { argv } = require("./utils/argv");

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

    console.log(config);
}


const obj = {
    count: 2,
    output: 'db-v',
    username: 'ev3VJFD5jAR6b9@',
    password: 'postgres',
    database: 'mocker',
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    port: 5432
}

fillUpConfigObj(obj)

