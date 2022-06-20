import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserController from "./controllers/user.controller";
import DialogController from "./controllers/Dialog.controller";
import MessageController from "./controllers/Message.controller";

dotenv.config();

const User = new UserController();
const Dialog = new DialogController();
const Message = new MessageController();

const app = express();
app.use(express.json());

app.post("/user/create", User.create);
app.get("/user/:id", User.find);
app.delete("/user/:id", User.delete);

app.post("/dialog/create", Dialog.create);
app.get("/dialog/:id", Dialog.find);
app.delete("/dialog/:id", Dialog.delete);

app.post("/message/create", Message.create);
app.get("/message/:id", Message.find);
app.delete("/message/:id", Message.delete);

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
