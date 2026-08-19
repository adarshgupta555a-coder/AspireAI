import type { Request, Response } from "express";
import userModel from "../models/users.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import SendEmail from "../services/email.service.js";
import { generateOtp } from "../utils/generateOtp.js";
import crypto from "crypto";
import OtpModel from "../models/Otp.model.js";
import SessionModel from "../models/session.models.js";


interface User {
    name: string;
    username: string;
    age: number;
    address: string;
}

const userData = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.RefreshToken;
        if (!token) {
            return res.status(400).json({
                message: "token is not defined"
            })
        }

        const decoded = jwt.verify(token, config.Jwt_Secret);

        const UserData = await userModel.findById(decoded.user_id)
        res.status(200).json({
            UserData
        })
    } catch (error) {
        console.log(error)
    }
}

const Register = async (req: Request, res: Response) => {
    try {

        const { username, email, password, profession } = req.body;

        const usercheck = await userModel.findOne({ email: email });

        if (usercheck) {
            return res.status(400).json({
                message: "this email is already have account."
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


        const Otp = generateOtp();
        const OtpHash = crypto.createHash("sha256").update(String(Otp)).digest("hex");

        await OtpModel.create({
            email: userCreate.email,
            user: userCreate._id,
            OtpHash
        })

        await SendEmail(userCreate.email, Otp);

        res.status(200).json({
            message: "user is registered",
            user: userCreate
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error })
    }
}


const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const usercheck = await userModel.findOne({ email: email });

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


        if (!usercheck.isVerified) {
            return res.status(400).send({ message: "user is not verified" })
        }


        const RefreshToken = jwt.sign({ id: usercheck._id }, config.Jwt_Secret, {
            expiresIn: "7d"
        })


        const hashRefreshToken = crypto.createHash("sha256").update(RefreshToken).digest("hex");

        const session = await SessionModel.create({
            user: usercheck._id,
            refreshTokenHash: hashRefreshToken,
            ip: req.ip,
            userAgent: req.headers['user-agent']
        })

        const AccessToken = jwt.sign({ id: usercheck._id, session_id: session._id }, config.Jwt_Secret, {
            expiresIn: "15m"
        })

        res.cookie("RefreshToken", RefreshToken, {
            httpOnly: true,
            secure: config.Node_env == "production",
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Loginned Successfully",
            AccessToken
        })

    } catch (error) {
        console.log(error)
        res.status(200).json({
            message: error.message
        })
    }
}


const RefreshToken = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.RefreshToken;
        if (!token) {
            return res.status(400).json({
                message: "Token is not defined."
            })
        }

        const decoded = jwt.verify(token, config.Jwt_Secret);

        const hashRefreshToken = crypto.createHash("sha256").update(token).digest("hex");

        const session = await SessionModel.findOne({ refreshTokenHash: hashRefreshToken, revoked: false });

        if (!session) {
            return res.status(400).json({
                message: "token is invalid."
            })
        }

        const AccessToken = jwt.sign({ id: decoded.id, sessionId: session._id }, config.Jwt_Secret, { expiresIn: "15m" });

        const newRefreshToken = jwt.sign({ id: decoded.id }, config.Jwt_Secret, { expiresIn: "7d" })

        const newrefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex");

        session.refreshTokenHash = newrefreshTokenHash;
        await session.save();


        res.cookie("RefreshToken", newRefreshToken, {
            httpOnly: true,
            secure: config.Node_env === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.status(200).send({ message: "Access token refreshed", AccessToken })

    } catch (error) {
        console.log(error)
    }
}

const TestGmailOtp = async (req: Request, res: Response) => {
    try {
        const Otp = generateOtp();
        const sended = await SendEmail("sanjuafre08@gmail.com", Otp);
        res.status(200).json({
            message: sended
        })
    } catch (error) {
        console.log(error)
    }
}


export {
    userData,
    Register,
    Login,
    TestGmailOtp
}
