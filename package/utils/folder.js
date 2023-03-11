const fs = require('fs')

class Directory {
  /**
   * checks the folder exists, in otherwise it creates that folder and puts seeders and models directories in it
   * @type {function}
   * @function namingFolder
   * @param {string} name - folder name
   */
  static namingFolder(name) {
    if (!fs.existsSync(`${process.cwd()}/${name}`)) {
      fs.mkdirSync(`${process.cwd()}/${name}`)
    }
    if (!fs.existsSync(`${process.cwd()}/${name}/seeders`)) {
      fs.mkdirSync(`${process.cwd()}/${name}/seeders`)
    }
    if (!fs.existsSync(`${process.cwd()}/${name}/models`)) {
      fs.mkdirSync(`${process.cwd()}/${name}/models`)
    }
  }

  /**
   * it will read the mentioned directory to check if file is exist in that folder or not
   * @type {function}
   * @function checkFileExists
   * @param {string} fileName
   * @param {string} folderName
   */
  static checkFileExists(fileName, folderName) {
    fileName = fileName + '.js'
    let fileDest = null

    const folder = fs.readdirSync(`${process.cwd()}/${folderName}/seeders`)

    folder.forEach((file) => {
      file = file.split('-')

      if (file[2] === fileName) {
        fileDest = file.join('-')
      }
    })

    return fileDest
  }
}

module.exports = { Directory }
