const { Utils, reservationCount } = require("../utils/utils");

const { Queries } = require("../db/services/queries");

const fs = require("fs");
const { Directory } = require("../utils/folder");
const { Redis } = require("../utils/redis");
const { fillUpConfigObj } = require("../config/connection");

async function generateStructure(relations) {
  // start of the generation
  for (let j = 0; j < relations.length; j++) {
    const tableForeignKey = JSON.parse(
      await Redis.getData(relations[j].tablewithforeignkey)
    );

    const tableReferenced = JSON.parse(
      await Redis.getData(relations[j].tablereferenced)
    );

    for (let i = 0; i < tableForeignKey.length; i++) {
      tableForeignKey[i][relations[j].foreignkeycolumn] =
        tableReferenced[i][relations[j].foreignkeycolumnreferenced];
    }

    await Redis.setData(
      relations[j].tablewithforeignkey,
      JSON.stringify(Object.values(tableForeignKey))
    );
  }
}

function createModelStructure(model) {
  try {
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
  } catch (error) {
    throw new Error(error);
  }
}

async function seedTypeStructure(model, columns) {
  try {
    const column = columns[model];

    const obj = {};

    column.forEach((col) => {
      if (col.column_name !== "deleted_at") {
        obj[col.column_name] = MatchColumnTypes(col);
      }
    });

    return obj;
  } catch (error) {
    throw new Error(error);
  }
}

async function createSeedStructure(model) {
  try {
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
  } catch (error) {
    throw new Error(error);
  }
}

async function generateSeedData(models, columns, count) {
  try {
    models.forEach(async (model) => {
      const obj = await seedTypeStructure(model, columns);

      const objArr = [];

      for (let i = 0; i < count; i++) {
        let newObj = extractDataFromObj(obj);

        objArr.push(newObj);
      }

      await Redis.setData(model, JSON.stringify(objArr));
    });
  } catch (error) {
    throw new Error(error);
  }
}

function extractDataFromObj(obj) {
  const randomString = Utils.randomUsername(10);
  let newObj = {};

  for (let index = 0; index < Object.keys(obj).length; index++) {
    if (Object.values(obj)[index] === "UUID") {
      newObj[Object.keys(obj)[index]] = Utils.randomUUID();
    } else if (
      Object.values(obj)[index] === "JSONB" ||
      Object.values(obj)[index] === "JSON"
    ) {
      newObj[Object.keys(obj)[index]] = "{}";
    } else if (Object.values(obj)[index] === "Date") {
      newObj[Object.keys(obj)[index]] = new Date().toISOString();
    } else if (Object.keys(obj)[index] === "password") {
      newObj[Object.keys(obj)[index]] = Utils.hashPass(randomString);
    } else if (Object.keys(obj)[index] === "role") {
      newObj[Object.keys(obj)[index]] = Utils.randomRole(1);
    } else if (Object.keys(obj)[index] === "roles") {
      newObj[Object.keys(obj)[index]] = Utils.randomRole(2);
    } else if (
      Object.keys(obj)[index].toString().toLowerCase() === "username"
    ) {
      newObj[Object.keys(obj)[index]] = randomString;
    } else if (
      Object.keys(obj)[index].includes("name") &&
      Object.keys(obj)[index] != "username"
    ) {
      newObj[Object.keys(obj)[index]] = Utils.randomName(10);
    } else if (
      (Object.values(obj)[index] === "STRING" &&
        Object.keys(obj)[index].includes("number")) ||
      (Object.values(obj)[index] === "STRING" &&
        Object.keys(obj)[index].includes("code"))
    ) {
      newObj[Object.keys(obj)[index]] = Utils.randomNumber(10);
    } else if (Object.keys(obj)[index].includes("email")) {
      newObj[Object.keys(obj)[index]] = Utils.randomEmail();
    } else if (Object.values(obj)[index] === "STRING") {
      newObj[Object.keys(obj)[index]] = randomString;
    } else if (Array.isArray(Object.values(obj)[index])) {
      newObj[Object.keys(obj)[index]] = Utils.getEnumValue(
        Object.values(obj)[index]
      );
    }
  }
  return newObj;
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
  try {
    const db = fillUpConfigObj(arg);

    const count = arg.count,
      folderName = arg.output,
      dbData = await Queries.getData(db),
      relations = dbData.relations,
      models = dbData.tables,
      columns = dbData.columns,
      tables = await sortModelsBasedOnRelations(relations, models);

    await generateSeedData(models, columns, count);

    await generateStructure(relations);

    Directory.namingFolder(folderName);

    let today = Utils.todayDate();

    tables.forEach(async (table) => {
      const randomNum = reservationCount();

      const structure = await createSeedStructure(table);

      const lowerCaseFileName = table.toLowerCase();
      const fileDest = Directory.checkFileExists(lowerCaseFileName, folderName);

      const fileName = !fileDest
        ? `${folderName}/seeders/${today}${randomNum}-create-${lowerCaseFileName}.js`
        : `${folderName}/seeders/${fileDest}`;

      fs.writeFile(fileName, `${structure}`, () => {});
      console.log(new Date() - arg.now);
    });
  } catch (error) {
    throw new Error(error);
  }
}

setTimeout(function () {
  return process.exit(0);
}, 3000);

module.exports = { createFile };
