import { configDotenv } from "dotenv";

configDotenv()

if (!process.env.MONGODB_URI) {
    throw Error("mongodb uri is not defined.") 
}

export const config = {
    Mongodb_uri: process.env.MONGODB_URI
}