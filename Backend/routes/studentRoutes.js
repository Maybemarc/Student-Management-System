import express from "express"
import { createStudent, deleteStudent, getAllStudents, getStudent, getStudentSUmmary, updateStudent } from "../controllers/studentController.js"
import { upload } from "../middleware/upload.js"
import {admin, protect} from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/summary",getStudentSUmmary)
router.get("/",getAllStudents)
router.post("/create",protect,admin ,upload.single("photo"),createStudent)
router.get("/:id",protect,admin ,getStudent)
router.put("/:id",protect,admin ,upload.single("photo"),updateStudent)
router.delete("/:id",protect,admin ,deleteStudent)


export default router