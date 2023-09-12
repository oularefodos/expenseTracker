import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({message : 'logout succeed', success : true}, {status : 201});
        response.cookies.delete("token");
        return response;
    }
    catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500})
    }
}