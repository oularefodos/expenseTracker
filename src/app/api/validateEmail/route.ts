import connectDB from "@/config/db.config";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req : NextRequest) {
    try {
        const body = await req.json();
        const { token } = body;


        // check if user exists
        const user = await User.findOne({ verifyToken : token, verifyTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return NextResponse.json(
                {error : {message : 'invalid Token'}, success : false}, 
                {status : 400}
            )
        }
        user.isVerified = true;
        await user.save();
        return NextResponse.json({message : "email verifield", success : true}, {status : 200})
    }
    catch (error : any) {
        console.log(error);
        return NextResponse.json({error : error.message}, {status : 500})
    }
}