import mongoose from "mongoose";


const connectDB = async () => {
    try{
        console.log("Connecting...");
        await mongoose.connect(process.env.MONGO_URI,{
             family: 4,
        });
        console.log("Connected to DB")
    } catch (error) {
        console.error("Database Connection Error:", error)
        process.exit(1)
    }

}

export default connectDB;