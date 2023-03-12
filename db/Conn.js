import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB = process.env.DB;
console.log(DB);

const Conn = async () => {
    
    try {
        await mongoose.connect(DB, {useUnifiedTopology: true});
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting to database", error.message);
    }
}

export default Conn;