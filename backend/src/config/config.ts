import { configDotenv } from "dotenv";

configDotenv()

if (!process.env.MONGODB_URI) {
    throw Error("mongodb uri is not defined.") 
}

if (!process.env.JWT_SECRET) {
    
}

export const config = {
    Mongodb_uri: process.env.MONGODB_URI,
    Jwt_Secret:  process.env.JWT_SECRET
}