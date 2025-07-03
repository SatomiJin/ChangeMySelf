import dotenv from "dotenv";
dotenv.config();
import * as pg from "pg";

// const { Sequelize } = require("sequelize");
import Sequelize from "sequelize";
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DB_DATABASE_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    // dialectModule: pg,
    query: {
      raw: true,
    },
    timezone: "+07:00",
    dialectOptions: {
      ssl: false,
    },
    logging: false, // nếu không muốn log SQL ra console
  }
);

export let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
