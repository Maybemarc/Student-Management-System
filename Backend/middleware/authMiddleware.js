import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/userSchema.js"

dotenv.config()

export const protect = async(req,res,next) => {
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({message:"Not authorized"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await User.findById(decoded.id).select("-password")
        if(!user){
            return res.status(401).json({message:"Not authorized, user not found"})
        }

        req.user = user
        next()

    } catch (error) {
         return res.status(401).json({message:"Not authorized, token invalid",error: error.message})
    }
}



export const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        return res.status(401).json({message:"Admin access required"})
    }
}