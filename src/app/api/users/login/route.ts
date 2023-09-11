import connectDB from "@/config/db.config";
import User from "@/models/user.models";
import { loginSchema } from "@/types/schema";
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req : NextRequest) {
    try {
        const body = await req.json();
        const {email, password} = body;

        // validate Data
        await loginSchema.validate({email, password});

        // check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json(
                {error : {message : 'incorrect password or email'}, success : false}, 
                {status : 400}
            );
        }

        // hash password
        const isValidePassword = await bcrypt.compare(password, user.password);
        if (!isValidePassword) {
            return NextResponse.json(
                {error : {message : 'incorrect password or email'}, success : false},
                 {status : 400}
            );
        }

        // generate token
        const token = jwt.sign({id : user._id, time : Date.now()}, process.env.JWT_KEY!, {expiresIn : "24h"});
        delete user.password;

        // create the response to send
        const response = NextResponse.json({message : 'login succeed', success : true}, {status : 201});
        response.cookies.set("token", token, {httpOnly : true});
        return response;
    }
    catch (error : any) {
        console.log(error)
        return NextResponse.json({error : error.message}, {status : 500})
    }
}