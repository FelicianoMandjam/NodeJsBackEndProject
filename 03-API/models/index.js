import { Sequelize } from "sequelize";
import userModel from "./user.model.js";

const sequelize = new Sequelize(
  "feliciano", //Nom de la bdd
  "root", // Identifiant Mysql
  "root", // MDP Mysql
  {
    host: "localhost", // URL du localhost
    dialect: "mysql",
    dialectOptions: {
      socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
    },
  }
);

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

userModel(sequelize, Sequelize);