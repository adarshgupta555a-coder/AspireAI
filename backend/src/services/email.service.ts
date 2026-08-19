import nodemailer from "nodemailer";
import { generateOtp } from "../utils/generateOtp.js";


const SendEmail = async (ToGmail: string, otp: number) => {
    try {
        // create transport object using gmail smtp
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // Use true for port 465, false for port 587
            auth: {
                user: 'adarshguptacoder@gmail.com',
                pass: 'jpjb vzrb hcco jcbm' // Leave out spaces
            }
        })

        // 2. Define the email options
        const mailOptions = {
            from: 'adarshguptacoder@gmail.com',
            to: ToGmail,
            subject: 'Resume Ai Otp Verification',
            text: 'Resume Ai Otp Verification',
            html: `<h1>${otp}!</h1>
            <br/>
        <p>Don't share with any one.</p>`
        };


        const info = await transporter.sendMail(mailOptions);
        console.log(info)
    } catch (error) {
        console.log(error)
    }
}

export default SendEmail;

