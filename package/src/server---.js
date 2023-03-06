const {
  reservationCount,
  todayDate,
  packageVersion,
  randomUUID,
  randomNumber,
  randomName,
  randomEmail,
  randomUsername,
  randomRole,
  getEnumValue,
  showingHelp
} = require("../utils/utils");

const {
  GetAllTables,
  GetCoulmnsFromEntity,
  GetRelations,
} = require("../db/services/queries");

// const {showingHelp} = require("../test");

const fs = require("fs");
const { genSaltSync, hashSync } = require("bcryptjs");
const { namingFolder, checkFileExists } = require("../utils/folder");
const { Redis } = require("../utils/redis");
const { argv } = require("../utils/argv");

const { fillUpConfigObj } = require("../config/connection");

// const option = {
//   output: argv.o || argv.output || "db",
//   count: argv.c || argv.count || 1,
//   version: argv.v || argv.version,
//   username: argv.u || argv.user || "postgres",
//   password: argv.x || argv.pass || "postgres",
//   database: argv.d || argv.database || "",
//   host: argv.h || argv.host || "localhost",
//   dialect: argv.e || argv.engine || "postgres",
//   logging: argv.l || argv.logging || false,
//   port: argv.p || argv.port || 5432,
//   helps: argv.helps
// }
// console.log(option.helps);

// if (argv.v || argv.version) {
//   packageVersion()
// } else if (option.helps) {
//   console.log('*****************');
//   showingHelp()
// }
// } else {
async function generateStructure(db) {
  const relations = await GetRelations(db);
  await catchRelIds(db);

  for (const rel of relations) {
    const refObjType = JSON.parse(await Redis.getData(rel.tablewithforeignkey));

    const fkColumn = JSON.parse(await Redis.getData(rel.foreignkeycolumn));

    for (const obj of refObjType) {
      obj[rel.foreignkeycolumn] = getEnumValue(fkColumn);
    }

    await Redis.setData(rel.tablewithforeignkey, JSON.stringify(refObjType));
  }
}

async function catchRelIds(db) {
  const relations = await GetRelations(db);

  for (const rel of relations) {
    let arr = {};

    const insertedRef = JSON.parse(await Redis.getData(rel.tablereferenced));

    for (const ref of insertedRef) {
      (arr[rel.foreignkeycolumn] || (arr[rel.foreignkeycolumn] = [])).push(
        ref[rel.foreignkeycolumnreferenced]
      );
    }

    await Redis.setData(Object.keys(arr)[0], JSON.stringify(Object.values(arr)[0]));
  }
}

async function createSeedAndInsert(count, db) {
  const models = await GetAllTables(db);

  models.forEach(async (model) => {
    const obj = await seedTypeStructure(model, db);

    const objType = generateSeedData(obj[model], count);

    await Redis.setData(model, JSON.stringify(objType));
  });
}

function createModelStructure(model) {
  const singularModel = model.slice(0, -1);

  const structure = `export default (sequelize, DataTypes) => {
      const ${singularModel} = sequelize.define(${model}, {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        paranoid: true,
      });
      return ${singularModel};
    };`;

  return structure;
}

async function seedTypeStructure(model, db) {
  let columns = await GetCoulmnsFromEntity(db);

  const column = columns[model];

  const obj = {};

  column.forEach((col) => {
    if (col.column_name !== "deleted_at") {
      obj[col.column_name] = MatchColumnTypes(col);
    }
  });

  return { [model]: obj };
}

async function createSeedStructure(model, db) {
  await generateStructure(db);

  const objType = JSON.parse(await Redis.getData(model));

  const structure = `
    export default {
      async up(queryInterface) {
    
        await queryInterface.bulkInsert(
          '${model}',
            ${JSON.stringify(objType)},
          {}
        )
      },
    
      async down(queryInterface) {
        await queryInterface.bulkDelete('${model}', null, {})
      },
    }`;

  return structure;
}

function generateSeedData(obj, count) {
  const objArr = [];

  const now = new Date()
  for (let i = 0; i < count; i++) {
    let newObj = {};
    const randomString = randomUsername(10);

    for (const key in obj) {
      if (obj[key] === "UUID") {
        newObj[key] = randomUUID();
      } else if (obj[key] === "JSONB" || obj[key] === "JSON") {
        newObj[key] = "{}";
      } else if (obj[key] === "Date") {
        newObj[key] = new Date().toISOString();
      } else if (key === "password") {
        newObj[key] = hashSync(randomString, genSaltSync(12));
      } else if (key === "role") {
        newObj[key] = randomRole(1);
      } else if (key === "roles") {
        newObj[key] = randomRole(2);
      } else if (key.toLowerCase() === "username") {
        newObj[key] = randomString;
      } else if (key.includes("name") && key != "username") {
        newObj[key] = randomName(10);
      } else if (
        (obj[key] === "STRING" && key.includes("number")) ||
        (obj[key] === "STRING" && key.includes("code"))
      ) {
        newObj[key] = randomNumber(10);
      } else if (key.includes("email")) {
        newObj[key] = randomEmail();
      } else if (obj[key] === "STRING") {
        newObj[key] = randomString;
      } else if (Array.isArray(obj[key])) {
        newObj[key] = getEnumValue(obj[key]);
      }
    }
    // console.log(i);
    objArr.push(newObj);
  }
  console.log(new Date() - now);
  return objArr;
}

function MatchColumnTypes(col) {
  let dataType = col.data_type;
  let enumValues = col.enumvalues;

  switch (dataType) {
    case "int2":
      dataType = "INTEGER";
      break;
    case "int4":
      dataType = "INTEGER";
      break;
    case "int8":
      dataType = "STRING";
      break;
    case "smallint":
      dataType = "SMALLINT";
      break;
    case "integer":
      dataType = "INTEGER";
      break;
    case "bigint":
      dataType = "STRING";
      break;
    case "decimal":
      dataType = "STRING";
      break;
    case "numeric":
      dataType = "STRING";
      break;
    case "real":
      dataType = "INTEGER";
      break;
    case "float":
      dataType = "FLOAT";
      break;
    case "float4":
      dataType = "FLOAT";
      break;
    case "float8":
      dataType = "FLOAT";
      break;
    case "double precision":
      dataType = "DOUBLE";
      break;
    case "money":
      dataType = "STRING";
      break;
    case "character varying":
      dataType = "STRING";
      break;
    case "varchar":
      dataType = "STRING";
      break;
    case "character":
      dataType = "STRING";
      break;
    case "char":
      dataType = "CHAR";
      break;
    case "bpchar":
      // ret.sqlType = "char";
      dataType = "STRING";
      break;
    case "text":
      dataType = "TEXT";
      break;
    case "citext":
      dataType = "CITEXT";
      break;
    case "hstore":
      dataType = "HSTORE";
      break;
    case "bytea":
      dataType = "BLOB";
      break;
    case "bit":
      dataType = "STRING";
      break;
    case "varbit":
      dataType = "STRING";
      break;
    case "bit varying":
      dataType = "STRING";
      break;
    case "timetz":
      dataType = "STRING";
      break;
    case "timestamptz":
      dataType = "Date";
      break;
    case "timestamp":
      dataType = "STRING";
      break;
    case "timestamp without time zone":
      dataType = "Date";
      break;
    case "timestamp with time zone":
      dataType = "Date";
      break;
    case "date":
      dataType = "DATEONLY";
      break;
    case "time":
      dataType = "TIME";
      break;
    case "time without time zone":
      dataType = "STRING";
      break;
    case "time with time zone":
      dataType = "STRING";
      break;
    case "interval":
      dataType = "any";
      break;
    case "bool":
      dataType = "BOOLEAN";
      break;
    case "boolean":
      dataType = "BOOLEAN";
      break;
    case "point":
      dataType = "STRING || object";
      break;
    case "line":
      dataType = "STRING";
      break;
    case "lseg":
      dataType = "STRING";
      break;
    case "box":
      dataType = "STRING || object";
      break;
    case "path":
      dataType = "STRING";
      break;
    case "polygon":
      dataType = "STRING";
      break;
    case "circle":
      dataType = "STRING || object";
      break;
    case "cidr":
      dataType = "CIDR";
      break;
    case "inet":
      dataType = "INET";
      break;
    case "macaddr":
      dataType = "MACADDR";
      break;
    case "tsvector":
      dataType = "TSVECTOR";
      break;
    case "tsquery":
      dataType = "STRING";
      break;
    case "uuid":
      dataType = "UUID";
      break;
    case "xml":
      dataType = "STRING";
      break;
    case "json":
      dataType = "JSON";
      break;
    case "jsonb":
      dataType = "JSONB";
      break;
    case "int4range":
      dataType = "STRING";
      break;
    case "int8range":
      dataType = "BIGINT";
      break;
    case "numrange":
      dataType = "DECIMAL";
      break;
    case "tsrange":
      dataType = "STRING";
      break;
    case "tstzrange":
      dataType = "DATE";
      break;
    case "daterange":
      dataType = "DATEONLY";
      break;
    case "ARRAY":
      // ret = this.MatchColumnTypes(
      //   udtName.substring(1),
      //   udtName,
      //   enumValues
      // );
      // ret.isArray = true;
      dataType = "ARRAY";
      break;
    case "USER-DEFINED":
      if (enumValues) {
        dataType = enumValues.split(",");
      }
      // switch (udtName) {
      //   case "citext":
      //   case "hstore":
      //   case "geography":
      //   case "geometry":
      //   case "ltree":
      //     ret.sqlType = udtName;
      //     break;
      //   default:
      //     if (enumValues) {
      //       dataType = `"${enumValues
      //         .split(",")
      //         .join('" | "')}"`;
      //       ret.sqlType = "enum";
      //       ret.enumValues = enumValues.split(",");
      //     }
      //     break;
      // }
      break;
    default:
      dataType = "NonNullable<unknown>";
      break;
  }

  return dataType;
}

async function sortModelsBasedOnRelations(db) {
  try {
    const relations = await GetRelations(db);

    const tables = await GetAllTables(db);

    for (let i = 0; i < relations.length; i++) {
      const fkIndex = tables.indexOf(relations[i].tablewithforeignkey);
      const refIndex = tables.indexOf(relations[i].tablereferenced);

      if (refIndex > fkIndex) {
        let temp = tables[fkIndex];
        tables[fkIndex] = tables[refIndex];
        tables[refIndex] = temp;
      }
    }

    return tables;
  } catch (err) {
    console.log(err);
  }
}

async function createFile(arg) {

  const db = fillUpConfigObj(arg)

  const count = arg.count
  const folderName = arg.output

  const tables = await sortModelsBasedOnRelations(db);

  await createSeedAndInsert(count, db);

  namingFolder(folderName);

  let today = todayDate();

  tables.forEach(async (file) => {
    const randomNum = reservationCount();

    const sturcture = await createSeedStructure(file, db)

    const lowerCaseFileName = file.toLowerCase();
    const fileDest = checkFileExists(lowerCaseFileName, folderName);

    const fileName = !fileDest
      ? `${folderName}/seeders/${today}${randomNum}-create-${lowerCaseFileName}.js`
      : `${folderName}/seeders/${fileDest}`;

    fs.writeFile(fileName, `${sturcture}`, () => { });
  });
}


// setTimeout((function () {
//   return process.exit(0)
// }), 3000);


module.exports = { createFile };


