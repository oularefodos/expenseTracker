import { EmailType } from "@/types";
import nodemailer from 'nodemailer';
import User from "@/models/user.models";
import jwt from "jsonwebtoken"

function generateVerificationCode(): string {
    return Math.random().toString().substr(2, 6);
}

const sendEmail = async (emailType : 'emailType' | 'passwordType', email : string, userId : string) => {

    try {
        // Generate  token
        const token = await jwt.sign({ userId : userId }, process.env.JWT_EMAIL_KEY!, {expiresIn : "1d"});
        
        // if (emailType === 'passwordType') {
        //     await User.findOneAndUpdate({email : email}, {
        //         forgotPasswordToken : token,
        //         forgotPasswordTokenExpiry : expiringTime
        //     });
        // }

        // SenEmail

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD_EMAIL,
            },
        });

        const emailSubject = emailType === 'emailType' ? "VALIDATE YOUR EMAIL" : "RESET YOUR PASSWORD";
        const link = `${process.env.DOMAIN}/verifyEmail?token=${token}`

        const info = await transporter.sendMail({
            from : process.env.EMAIL as string,
            to : email,
            subject : emailSubject,
            html : `<p>Click On this Link to confirm : <a href="${link}">Ici</a> </p>`
        })
        return {message : 'Email is sent'}
    }
    catch (error : any) {
        throw(new Error(error.message))
    }
}

export default sendEmail;