import env from '../common/env'

export default {
  development: {
    username: env('DB_USER'),
    password: env('DB_PASS'),
    database: env('DB_NAME'),
    host: env('DB_HOST'),
    dialect: env('DB_DIALECT'),
    logging: false,
  },
  test: {
    username: env('DB_USER'),
    password: env('DB_PASS'),
    database: env('DB_NAME'),
    host: env('DB_HOST'),
    dialect: env('DB_DIALECT'),
    logging: false,
  },
  production: {
    username: env('DB_USER'),
    password: env('DB_PASS'),
    database: env('DB_NAME'),
    host: env('DB_HOST'),
    dialect: env('DB_DIALECT'),
    logging: false,
  },
  date: true,
}
