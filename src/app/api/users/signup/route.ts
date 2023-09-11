import connectDB from "@/config/db.config";
import User from "@/models/user.models";
import { signupSchema } from "@/types/schema";
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from "next/server";

connectDB();

export  async function  POST (req : NextRequest) {
    try {
        const body = await req.json();
        const {name, email, password} = body;

        // validate data
        await signupSchema.validate({name, email, password});

        // check if this email exist
        const user = await User.findOne({email});
        if (user) return NextResponse.json({error : {message : "Invalid email"}, success : false}, {status : 400});

        // hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create User 
        const newUser = new User({name, email, password : hashedPassword});
        await newUser.save();
        return NextResponse.json({message : "User created with success", success : true}, {status : 201});
    }
    catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500});
    }
}