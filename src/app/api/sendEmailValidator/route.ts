import connectDB from "@/config/db.config";
import sendEmail from "@/config/emailSender";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req : NextRequest) {
    try {
        const body = await req.json();
        const { email } = body;


        // check if user exists
        const user = await User.findOne({email : email});
        if (!user) {
            return NextResponse.json(
                {error : {message : 'invalid Email'}, success : false}, 
                {status : 400}
            );
        }
        await sendEmail('emailType', email, user._id);
        return NextResponse.json({message : "verifacation is sent", success : true}, {status : 200});
    }
    catch (error : any) {
        console.log(error);
        return NextResponse.json({error : error.message}, {status : 500})
    }
}