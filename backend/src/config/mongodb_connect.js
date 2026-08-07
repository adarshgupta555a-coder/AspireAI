import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27017/aspireAI";

const dbConnection = async () => {
    try {
        await mongoose.connect(uri);
        console.log("mongodb is connected")
    } catch (error) {
        console.log(error)
    }
}

export default dbConnection;