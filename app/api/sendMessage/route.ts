import { serverPusher } from "@/pusher";
import redis from "@/redis";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {message} = await request.json();
    const newMessage: Message = {
        ...message,
        createdAt: Date.now(),

    };

    // adding data to the db

    await redis.hset("messages", message.id, JSON.stringify(newMessage));
    serverPusher.trigger("messages", "new-message", newMessage)

    
    // returning the data(messags)


    return NextResponse.json({ message: newMessage }, { status: 200 })



    
}




// import { serverPusher } from "@/pusher";
// import redis from "@/redis";
// import {  NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const { message } = await request.json();

//   const newMessage = {
//     ...message,
//     createdAt: Date.now(),
//   }

//   await redis.hset("messages", message.id, JSON.stringify(newMessage));
//   await serverPusher.trigger("chat", "new-message", newMessage);

//   // rigger on channel the event passing the message/data

  

  



//   return NextResponse.json({ 
//     message: newMessage,
  
//   }, {
//     status: 200,
//   })


// }
