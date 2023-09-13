import connectDB from "@/config/db.config";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req : NextRequest) {
    try {
        const body = await req.json();
        const { token } = body;
        const {userId} = await jwt.verify(token, process.env.JWT_EMAIL_KEY!) as {userId : string}
        
        // check if user exists
        const user = await User.findOneAndUpdate({_id : userId}, {isVerified : true});
        console.log(user, token, "miros")
        if (!user) {

            return NextResponse.json(
                {error : {message : 'invalid Token'}, success : false}, 
                {status : 400}
            )
        }
        await user.save();
        return NextResponse.json({message : "email verifield", success : true}, {status : 200})
    }
    catch (error : any) {
        console.log(error);
        return NextResponse.json({error : error.message}, {status : 500})
    }
}