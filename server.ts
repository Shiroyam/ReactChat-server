import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserController from "./controllers/user.controller";
import DialogController from "./controllers/Dialog.controller";

dotenv.config();

const User = new UserController();
const Dialog = new DialogController();

const app = express();
app.use(express.json());

app.get("/user/:id", User.find);
app.post("/user/create", User.create);
app.delete("/user/:id", User.delete);

app.post("/dialog/create", Dialog.create);
app.post("/dialog/find", Dialog.find);
app.delete("/dialog/:id", Dialog.delete);
 
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3004;
const DB_URL =
  "mongodb+srv://user:user@cluster0.lwikw.mongodb.net/testcreate?retryWrites=true&w=majority";

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

startApp();
