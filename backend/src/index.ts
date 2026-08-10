import express from "express";
import cors from "cors";
import dbConnection from "./config/mongodb_connect.js";
import userRouter from "./routes/users.routes.js";

const app = express();
dbConnection()
app.use(cors())
app.use(express.json());

app.use("/api/users", userRouter)

app.listen(8000,()=>{
    console.log("port is running on 8000.")
})