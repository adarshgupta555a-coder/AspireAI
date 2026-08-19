import { configDotenv } from "dotenv";

configDotenv()

if (!process.env.MONGODB_URI) {
    throw Error("mongodb uri is not defined.") 
}

if (!process.env.JWT_SECRET) {
     throw Error("jwt secret is not defined.") 
}

if (!process.env.EMAIL_APP_PASSWORD) {
     throw Error("EMAIL APP Password is not defined.") 
}

if (!process.env.NODE_ENV) {
    throw Error("Node env Password is not defined.");
}

export const config = {
    Mongodb_uri: process.env.MONGODB_URI,
    Jwt_Secret:  process.env.JWT_SECRET,
    Email_App_Password: process.env.EMAIL_APP_PASSWORD,
    Node_env: process.env.NODE_ENV
}