import authMiddleware from "@/ApiMiddleware/auth.middleware";
import connectDB from "@/config/db.config";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req : NextRequest) {
    try {
        const userData = await authMiddleware(req);
        const userId = userData.id
        const user = await User.findOne({ _id : userId}, ['-password', '-role']);
        return NextResponse.json({message : "success", success : true, user : user}, {status : 200});
    }
    catch (error : any) {
        console.log(error)
        return NextResponse.json({error : error.message}, {status : 500})
    }
}