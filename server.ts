import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express();

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3004;

app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
})
