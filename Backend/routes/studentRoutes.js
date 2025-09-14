import express from "express"
import { createStudent } from "../controllers/studentController.js"
import { upload } from "../middleware/upload.js"

const router = express.Router()

router.post("/create",upload.single("photo"),createStudent)

export default router