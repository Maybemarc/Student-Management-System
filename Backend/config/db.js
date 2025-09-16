import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

export const connectDb = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGOURL)
        console.log(`Database Connected`);
    } catch (error) {
        console.log(`Error in connecting db: `,error.message);
    }

}
