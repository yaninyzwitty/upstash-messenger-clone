"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

type Props = {
  message: Message;
};

function MessageComponent({ message }: Props) {
  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;
  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          src={message?.profilePic}
          alt="Profile picture"
          width={50}
          height={10}
          className="rounded-full mx-2"
        />
      </div>
      <div>
        <p
          className={`text-xs pb-2 text-gray-500 ${
            isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
          }`}
        >
          {message?.userName}
        </p>

        <div className="flex items-end">
          <div
            className={`px-4 py-3 text-sm rounded-lg w-fit text-white bg-blue-400 ${
              isUser ? "bg-blue-400 ml-auto order-2 " : "bg-red-400"
            }`}
          >
            <p>{message?.message}</p>
          </div>
          <p
            className={`text-xs italic px-2 text-gray-400 ${
              isUser && "text-right"
            }`}
          >
            {new Date(message?.createdAt).toLocaleString("en-us", {
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageComponent;
