import { Sequelize } from "sequelize";
import contactModel from "../model/contact.model.js";

// Connecion a la BDD SQL
const connection = new Sequelize(
  "contactNode", //Nom BDD
  "root",
  "root",
  {
    host: "localhost", // URL de mySQL
    dialect: "mysql",
    dialectOptions: {
      socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
    },
  }
);

try {
  await connection.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.log("Unable to connect to the database");
}

contactModel(connection, Sequelize);

const { Contact } = connection.models;
await connection.sync();

export { Contact };
