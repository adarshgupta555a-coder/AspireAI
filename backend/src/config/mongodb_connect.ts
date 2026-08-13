import mongoose from "mongoose";
import {config} from "./config.js"

const dbConnection = async () => {
    try {
        await mongoose.connect(config.Mongodb_uri);
        console.log("mongodb is connected")
    } catch (error) {
        console.log(error)
    }
}

export default dbConnection;