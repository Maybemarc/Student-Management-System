import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import studentRoutes from "./routes/studentRoutes.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/auth", authRoutes)
app.use("/api/student",studentRoutes)

app.get("/" ,(req,res) => {
    res.json({message: "Works Properly"})
} )

await connectDb()

app.listen(port,() => {
    console.log(`Server is listetening on port: ${port}`);
} )
