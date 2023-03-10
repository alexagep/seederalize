const { Sequelize } = require('sequelize')
const { validationCommands } = require('../utils/validateConfig')
const config = require('./config')

/**
 * it will initialize database by the passed config and returns db sequelize to use it in our queries
 * @type {function}
 * @function fillUpConfigObj
 * @param {object} option
 * @return {object} db
 */
function fillUpConfigObj(option) {
  try {
    validationCommands(option)

    const db = {}

    for (const key in config) {
      if (option[key]) {
        config[key] = option[key]
      }
    }

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
    )

    db.sequelize = sequelize
    db.Sequelize = Sequelize

    return db
  } catch (error) {
    throw `Invalid Configuration: ${error.message}`
  }
}

module.exports = { fillUpConfigObj }
