import express from "express"
import { forgetPassword, getMe, login, logout, registerUser, resetPassword } from "../controllers/authController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",login)
router.post("/logout",logout)
router.post("/forgot-password",forgetPassword)
router.post("/reset-password",resetPassword)
router.get("/me",protect,getMe)


export default router