import express from "express";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import {setupJWTStrategy} from "./auth/index.js";
import bookRoutes from "./routes/books.js";
import authRoutes from "./routes/auth.js";
const PORT = process.env.PORT || 8080;
dotenv.config()
//Create an instance of an express application
const app = express();

//Adds JSON middleware so the server can understand the json data that gets sent to it
app.use(express.json());
app.use(cors());
setupJWTStrategy(passport);

app.use("/auth", authRoutes);

app.use("/books", bookRoutes);

app.listen(PORT, function () {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
