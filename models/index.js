"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const dialect = process.env.DB_DIALECT || config.dialect || "sqlite";
const database = process.env.DB_DATABSE || config.database || "database";
const username = process.env.DB_USERNAME || config.username || "root";
const password = process.env.DB_PASSWORD || config.password || "root";
const host = process.env.DB_HOST || config.host || "localhost";

const connectionObject = {
  host: host, 
  dialect,
  pool: {
    max: process.env.DB_POOL_MAX | 5,
    min: process.env.DB_POOL_MIN | 1,
    acquire: process.env.DB_POOL_ACQUIRE | 30000,
    idle: process.env.DB_POOL_IDLE | 10000,
  },
};

if (dialect === "sqlite")
  connectionObject.storage = config.storage || "./app.db";

const db = {};

let sequelize = new Sequelize(database, username, password, connectionObject)

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
