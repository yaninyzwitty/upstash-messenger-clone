"use client";
import { v4 as uuid } from "uuid";

import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetchMessages";

function ChatInput() {
  // fetch data with useSwr
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);

  // good upto here..
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input && !session) return;
    const inputToSend = input;
    setInput("");

    const id = uuid();

    // good..

    const message: Message = {
      id,
      createdAt: Date.now(),
      email: session?.user?.email!,
      message: inputToSend,
      profilePic: session?.user?.image!,
      userName: session?.user?.name!,
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }).then((res) => res.json());

      return [data.message, ...messages!];
    };

    await mutate(uploadMessageToUpstash(), {
      rollbackOnError: true,
      optimisticData: [message, ...messages!],
    });

    // uploadMessageToUpstash();
  };

  return (
    <form
      className="flex px-10 py-5 space-x-2 border-t bg-white border-gray-300 fixed bottom-0 z-50 w-full"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Send Message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
