import type { Request, Response } from "express";
import userModel from "../models/users.models.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
import {config} from "../config/config.js";

interface User {
    name: string;
    username: string;
    age: number;
    address: string;
}

const userData = ( req: Request, res: Response) => {
    try {
        const obj: User = {
            name:"Adarsh",
            username: "Adarsh Gupta",
            age: 20,
            address: "pandesara"
        }
        res.json(obj)
    } catch (error) {
        console.log(error)
    }
}

const Register = async (req: Request, res: Response) => {
   try {

    const {username, email, password , profession} = req.body;

    const usercheck = await userModel.findOne({email: email});

    if (usercheck) {
        return res.status(400).json({
            message:"this email is already have account."
        })
    }

    const salt = await bcrypt.genSalt(10);
    const Passwordhash = await bcrypt.hash(password, salt);

    const userCreate = await userModel.create({
        username,
        email,
        password: Passwordhash,
        profession
    })

    res.status(200).json({
        message:"user is registered",
        user: userCreate
    })

   } catch (error) {
    console.log(error)
    res.status(400).json({message: error})
   }
}


const Login = async (req:Request, res: Response) => {
    try {
        const {email, password} = req.body;

        const usercheck = await userModel.findOne({email: email});

        if (!usercheck) {
            return res.status(401).json({
                message: "Unauthorized users"
            })
        }

        const PassCheck = await bcrypt.compare(password, usercheck.password)
        if (!PassCheck) {
            return res.status(401).json({
                message: "Unauthorized user"
            })
        }

        const Token = jwt.sign({user: usercheck}, config.Jwt_Secret);

        res.cookie("token", Token);

        res.status(200).json({
            message: "Loginned Successfully"
        })


        
    } catch (error) {
        console.log(error)
         res.status(200).json({
            message: error.message
        })
    }
}


export {
    userData,
    Register,
    Login
}
