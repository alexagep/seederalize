import Sequelize, { QueryTypes } from 'sequelize'
import config from '../config/database'
import env from '../common/env'

const runTimeEnv = process.env.NODE_ENV || 'development',
  envConfig = config[runTimeEnv]

export const initDatabase = async () => {
  const createDb = `CREATE DATABASE ${envConfig.database}`,
    createRole = `CREATE ROLE ${envConfig.username} WITH LOGIN PASSWORD '${envConfig.password}'`,
    grantRoleAccess = `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${envConfig.username};`,
    grantAccessToCopy = `GRANT pg_write_server_files TO ${envConfig.username}`

  try {
    const sequelize = new Sequelize(
        env('PG_DATABASE'),
        env('PG_USER'),
        env('PG_PASS'),
        envConfig
      ),
      existDb = await sequelize.query(
        `SELECT 1 FROM pg_catalog.pg_database WHERE datname = '${envConfig.database}';`,
        { type: QueryTypes.SELECT }
      ),
      existRole = await sequelize.query(
        `SELECT 1 FROM pg_roles WHERE rolname = '${envConfig.username}';`,
        { type: QueryTypes.SELECT }
      )

    !existDb.length && (await sequelize.query(createDb))

    !existRole.length &&
      (await sequelize.query(createRole)) &&
      (await sequelize.query(grantRoleAccess)) &&
      (await sequelize.query(grantAccessToCopy))


    await sequelize.close()

    process.exit(0)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('ERROR IN INITIALIZING DATABASE', err)
  }
}
