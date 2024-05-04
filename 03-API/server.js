import express from "express";
import mongoose from "mongoose";
import { env } from "./config.js";
// ROUTES
import routerUser from "./router.user.js";
import routerMongoUser from "./user.js" 
import routerArticle from "./article.js"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

// PORT
const PORT = env.port || 8080;

// DATABASE MONGOOSE
mongoose
  .connect(env.mongoURI, { dbName: "Utilisateur" })
  .then(() => console.log("Connexion à Mongoose réussie"))
  .catch((error) => console.log(error));

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());

// MIDDLEWARE TO ROUTE  ( Je met les prefixe des differentes routes )
app.use("/api/user", routerUser);
app.use("/api/mongo/user" , routerMongoUser);
app.use("/api/mongo/article" ,routerArticle);

// LISTEN
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
