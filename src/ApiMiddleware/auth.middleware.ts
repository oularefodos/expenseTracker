import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { decode } from "punycode";

const authMiddleware = async (req : NextRequest) => {
    try{
        const token = req.cookies.get('token')?.value || '';
        const decodedToken = await jwt.verify(token, process.env.JWT_KEY!) as {id : string, time : Date}
        return decodedToken;
    }
    catch (error : any) {
        throw (new Error(error.message))
    }
}

export default authMiddleware;