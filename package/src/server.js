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
  showingHelp,
} = require("../utils/utils");

const { Queries } = require("../db/services/queries");

// const {showingHelp} = require("../test");

const fs = require("fs");
const { genSaltSync, hashSync } = require("bcryptjs");
const { namingFolder, checkFileExists } = require("../utils/folder");
const { Redis } = require("../utils/redis");
const { argv } = require("../utils/argv");

const { fillUpConfigObj } = require("../config/connection");

async function generateStructure(relations) {

  for (const rel of relations) {

    const tableForeignKey = JSON.parse(
      await Redis.getData(rel.tablewithforeignkey)
    );

    const tableReferenced = JSON.parse(
      await Redis.getData(rel.tablereferenced)
    );

    for (let i = 0; i < tableForeignKey.length; i++) {
      tableForeignKey[i][rel.foreignkeycolumn] =
        tableReferenced[i][rel.foreignkeycolumnreferenced];
    }

    await Redis.setData(
      rel.tablewithforeignkey,
      JSON.stringify(Object.values(tableForeignKey))
    );
  }
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

async function seedTypeStructure(model, columns) {
  const column = columns[model];

  const obj = {};

  column.forEach((col) => {
    if (col.column_name !== "deleted_at") {
      obj[col.column_name] = MatchColumnTypes(col);
    }
  });

  return obj;
}

async function createSeedStructure(model) {
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

async function generateSeedData(models, columns, count, arg) {
  models.forEach(async (model) => {
    const obj = await seedTypeStructure(model, columns);

    const now = new Date();

    console.log('afterSeedTypeStructure', new Date() - arg.now);
    
    const objArr = [];

    // const now = new Date();
    for (let i = 0; i < count; i++) {
      // let newObj = {};
      // const randomString = randomUsername(10);

      // console.log('before-extractDataFromObj', new Date() - arg.now);

      const beforeExtractDataFromObj = new Date();

      let newObj = extractDataFromObj(obj)

      console.log('after-extractDataFromObj', new Date() - beforeExtractDataFromObj);


      objArr.push(newObj);
    }
    console.log('generateSeedData', new Date() - now);

    await Redis.setData(model, JSON.stringify(objArr));
  });
}

function extractDataFromObj (obj) {
  const randomString = randomUsername(10);
  let newObj = {};

  console.log(Object.keys(obj)[0]);
  // for (const key in obj) {
    for (let index = 0; index < Object.keys(obj).length; index++) {
      if (Object.values(obj)[index] === "UUID") {
        newObj[Object.keys(obj)[index]] = randomUUID();
      } else if (Object.values(obj)[index] === "JSONB" || Object.values(obj)[index] === "JSON") {
        newObj[Object.keys(obj)[index]] = "{}";
      } else if (Object.values(obj)[index]=== "Date") {
        newObj[Object.keys(obj)[index]] = new Date().toISOString();
      } else if (Object.values(obj)[index] === "password") {
        newObj[Object.keys(obj)[index]] = hashSync(randomString, genSaltSync(12));
      } else if (Object.values(obj)[index] === "role") {
        newObj[Object.keys(obj)[index]] = randomRole(1);
      } else if (Object.values(obj)[index] === "roles") {
        newObj[Object.keys(obj)[index]] = randomRole(2);
      } else if (Object.values(obj)[index].toString().toLowerCase() === "username") {
        newObj[Object.keys(obj)[index]] = randomString;
      } else if (Object.values(obj)[index].includes("name") && Object.keys(obj)[index] != "username") {
        newObj[Object.keys(obj)[index]] = randomName(10);
      } else if (
        (Object.values(obj)[index]=== "STRING" && Object.keys(obj)[index].includes("number")) ||
        (Object.values(obj)[index] === "STRING" && Object.keys(obj)[index].includes("code"))
      ) {
        newObj[Object.keys(obj)[index]] = randomNumber(10);
      } else if (Object.values(obj)[index].includes("email")) {
        newObj[Object.keys(obj)[index]] = randomEmail();
      } else if (Object.values(obj)[index] === "STRING") {
        newObj[Object.keys(obj)[index]] = randomString;
      } else if (Array.isArray(Object.values(obj)[index])) {
        newObj[Object.keys(obj)[index]] = getEnumValue(Object.values(obj)[index]);
      }
    // }
    // if (obj[key] === "UUID") {
    //   newObj[key] = randomUUID();
    // } else if (obj[key] === "JSONB" || obj[key] === "JSON") {
    //   newObj[key] = "{}";
    // } else if (obj[key] === "Date") {
    //   newObj[key] = new Date().toISOString();
    // } else if (key === "password") {
    //   newObj[key] = hashSync(randomString, genSaltSync(12));
    // } else if (key === "role") {
    //   newObj[key] = randomRole(1);
    // } else if (key === "roles") {
    //   newObj[key] = randomRole(2);
    // } else if (key.toLowerCase() === "username") {
    //   newObj[key] = randomString;
    // } else if (key.includes("name") && key != "username") {
    //   newObj[key] = randomName(10);
    // } else if (
    //   (obj[key] === "STRING" && key.includes("number")) ||
    //   (obj[key] === "STRING" && key.includes("code"))
    // ) {
    //   newObj[key] = randomNumber(10);
    // } else if (key.includes("email")) {
    //   newObj[key] = randomEmail();
    // } else if (obj[key] === "STRING") {
    //   newObj[key] = randomString;
    // } else if (Array.isArray(obj[key])) {
    //   newObj[key] = getEnumValue(obj[key]);
    // }
  }
  return newObj
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

async function sortModelsBasedOnRelations(relations, tables) {
  try {
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
  const db = fillUpConfigObj(arg);

  console.log('fillUpConfigObj', new Date() - arg.now);

  const count = arg.count,
    folderName = arg.output,
    dbData = await Queries.getData(db),
    relations = dbData.relations,
    models = dbData.tables,
    columns = dbData.columns,
    tables = await sortModelsBasedOnRelations(relations, models);

  console.log('afterQueries', new Date() - arg.now);


  await generateSeedData(models, columns, count, arg);
  
  console.log('afterGenerateSeedData', new Date() - arg.now);

  
  await generateStructure(relations);

  namingFolder(folderName);

  let today = todayDate();

  tables.forEach(async (table) => {
    const randomNum = reservationCount();
 
    const sturcture = await createSeedStructure(table);

    const lowerCaseFileName = table.toLowerCase();
    const fileDest = checkFileExists(lowerCaseFileName, folderName);

    const fileName = !fileDest
      ? `${folderName}/seeders/${today}${randomNum}-create-${lowerCaseFileName}.js`
      : `${folderName}/seeders/${fileDest}`;

    fs.writeFile(fileName, `${sturcture}`, () => {});

    console.log('afterFileWriting', new Date() - arg.now);

  });
}

// setTimeout((function () {
//   return process.exit(0)
// }), 3000);

module.exports = { createFile };
