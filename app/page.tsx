import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";
import getBaseUrl from "@/lib/getBasePath";

export default async function Home() {
  // fetching messages with dynamic (ssr)

  const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`, {
    cache: "no-store",
  }).then((res) => res.json());

  const messages: Message[] = data.messages;

  return (
    <main>
      <MessageList initialMessages={messages} />
      <ChatInput />
    </main>
  );
}
