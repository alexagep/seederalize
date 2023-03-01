const fs = require("fs");

function namingFolder(name) {

  if (!fs.existsSync(`${process.cwd()}/${name}`)) {
    fs.mkdirSync(`${process.cwd()}/${name}`);
  }
  if (!fs.existsSync(`${process.cwd()}/${name}/seeders`)) {
    fs.mkdirSync(`${process.cwd()}/${name}/seeders`);
  }
  if (!fs.existsSync(`${process.cwd()}/${name}/models`)) {
    fs.mkdirSync(`${process.cwd()}/${name}/models`);
  }
}

function checkFileExists(fileName, folderName) {
  fileName = fileName + ".js";
  let fileDest = null;

  const folder = fs.readdirSync(`${process.cwd()}/${folderName}/seeders`);
  folder.forEach((file) => {
    file = file.split("-");

    if (file[2] === fileName) {
      fileDest = file.join("-");
    }
  });

  return fileDest;
}

module.exports = { namingFolder, checkFileExists };
