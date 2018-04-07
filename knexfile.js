require("dotenv").config();
require("babel-register");

const dbConfig = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    },
    migrations: {
      tableName: "migrations"
    },
    useNullAsDefault: true
  }
};

module.exports = dbConfig;
