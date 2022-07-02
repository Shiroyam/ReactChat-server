import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserController from "./controllers/user.controller";
import DialogController from "./controllers/Dialog.controller";
import MessageController from "./controllers/Message.controller";
import { authCheck } from "./middleware/authCheck";

dotenv.config();

const User = new UserController();
const Dialog = new DialogController();
const Message = new MessageController();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/user/create", User.create);
app.post("/user/login", User.login);
app.get("/user/:id", User.find);
app.get("/user", authCheck ,User.findAll)
app.delete("/user/:id", authCheck, User.delete);

app.post("/dialog/create", authCheck, Dialog.create);
app.get("/dialog/:id", authCheck, Dialog.find);
app.delete("/dialog/:id", authCheck, Dialog.delete);

app.post("/message/create", authCheck, Message.create);
app.get("/message/:id", authCheck, Message.find);
app.delete("/message/:id", authCheck, Message.delete);

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
