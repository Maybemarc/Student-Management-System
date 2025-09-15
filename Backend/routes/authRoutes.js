import express from "express"
import { forgetPassword, login, logout, registerUser, resetPassword } from "../controllers/authController.js"

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",login)
router.post("/logout",logout)
router.post("/forgot-password",forgetPassword)
router.post("/reset-password",resetPassword)


export default router