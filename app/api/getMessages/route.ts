import redis from "@/redis";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // fetching hashed list from the redis server / backend
    const messageRes = await redis.hvals("messages");
    const messages: Message[] =  messageRes.map(message => JSON.parse(message)).sort((a,b) => b.createdAt - a.createdAt);
    return NextResponse.json({ messages }, { status: 200});




}


// import redis messages
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {

//     // fetching hashed list from the redis server / backend
//     const messageRes = await redis.hvals("messages");
//     const messages: Message[] =  messageRes.map(message => JSON.parse(message)).sort((a,b) => b.createdAt - a.createdAt);
//     return NextResponse.json({ messages }, { status: 200});



// }