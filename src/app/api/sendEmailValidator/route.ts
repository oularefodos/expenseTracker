import connectDB from "@/config/db.config";
import sendEmail from "@/config/emailSender";
import User from "@/models/user.models";
import { EmailSender } from "@/types/schema";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req : NextRequest) {
    try {
        const body = await req.json();
        const {email} = body;

        console.log(email);
        await EmailSender.validate({email : email})

        const user = await User.findOne({email : email});
        if (!user || user.isVerified) {
            return NextResponse.json({error : {message :"email Invalid"}}, {status : 400});
        }
        await sendEmail('emailType', email, user._id);
        return NextResponse.json({message :"email is sent"}, {status : 200});
    }
    catch (error : any) {
        console.log(error);
        return NextResponse.json({error : error.message}, {status : 500})
    }
}