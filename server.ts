import express from "express";
import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";
import User from "./models/users.models";

const app = express();
app.use(express.json());

app.post("/create", async (req: any, res: any) => {
  try {
    const postData = {
      "email": req.body.email,
      "fullname": req.body.fullname,
      "password": req.body.password,
    };

    const user = new User(postData);
    const doc = await user.save();
    res.json(doc);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:"error"
    })
  }
});

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
