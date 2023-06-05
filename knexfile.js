require('dotenv').config()

module.exports = {
  development: {
    client: "mysql",
    connection: {
      user: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      password:process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds'
    }
  },

  staging: {
    client: "mysql",
    connection: {
      user: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      password:process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds'
    }
  },

  production: {
    client: "mysql",
    connection: {
      user: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      password:process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds'
    }
  }
};