import { EmailType } from "@/types";
import nodemailer from 'nodemailer';
import User from "@/models/user.models";
import bcrypt from 'bcrypt'


const sendEmail = async (emailType : 'emailType' | 'passwordType', email : string, userId : string) => {

    try {
        // Generate a hash token
        const salt = await bcrypt.genSalt(10);
        const hashedToken = await bcrypt.hash(userId.toString(), salt);

        console.log(userId);
        const expiringTime = Date.now() + 360000;
        
        // Update User
        if (emailType === 'emailType') {
            await User.findOneAndUpdate({email : email}, {
                verifyToken : hashedToken,
                verifyTokenExpiry : expiringTime
            });
        }
        else if (emailType === 'passwordType') {
            await User.findOneAndUpdate({email : email}, {
                forgotPasswordToken : hashedToken,
                forgotPasswordTokenExpiry : expiringTime
            });
        }

        // SenEmail

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD_EMAIL,
            },
        });

        const emailSubject = emailType === 'emailType' ? "VALIDATE YOUR EMAIL" : "RESET YOUR PASSWORD";
        const link = emailType === 'emailType' ? `${process.env.DOMAIN}/verifyEmail/${hashedToken}` : `${process.env.DOMAIN}/verifyPassword/${hashedToken}`

        const info = await transporter.sendMail({
            from : process.env.EMAIL as string,
            to : email,
            subject : emailSubject,
            html : `<p> Click on this <a href="${link}"> Link <a/> <br/> Or copy this <br/> ${link} </p>`
        })
        return {message : 'Email is sent'}
    }
    catch (error : any) {
        throw(new Error(error.message))
    }
}

export default sendEmail;