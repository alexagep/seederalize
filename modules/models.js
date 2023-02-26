import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import Sequelize from 'sequelize'
import env from '../common/env'
import databaseConfig from '../config/database'

const config = databaseConfig[env('NODE_ENV')],
  db = {}

let sequelize

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

console.log(
  chalk.bold.cyan(`
        ----------------------------
            POSTGRES CONNECTED
        ----------------------------`)
)

// if (env('NODE_ENV') === 'production') {
//   const context = require
//     .context('/src/modules/', true, /model.js$/, 'sync')
//     .keys()
//     .map(context)
//     .forEach((module) => {
//       const sequelizeModel = module.default(sequelize, Sequelize)

//       db[sequelizeModel.name] = sequelizeModel
//     })
// } else {
  fs.readdirSync(path.join(process.cwd(), 'src/modules/')).forEach((module) => {
    if (module !== 'index.js' && module !== 'models.js') {
      fs.readdirSync(path.join(process.cwd(), 'src/modules/', module)).forEach(
        (file) => {
          if (file.includes('model.js')) {
            const sequelizeModel = require(path.join(
              process.cwd(),
              'src/modules/',
              module,
              file
            )).default(sequelize, Sequelize.DataTypes)
            db[sequelizeModel.name] = sequelizeModel
          }
        }
      )
    }
  })
// }

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
