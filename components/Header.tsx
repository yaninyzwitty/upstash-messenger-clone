"use client";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  if (!session)
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm ">
        <div className="flex flex-col items-center space-y-5">
          <div className="flex items-center space-x-2">
            <Image
              src={"https://links.papareact.com/jne"}
              alt=""
              width={50}
              height={10}
            />
            <p className="text-blue-400">Welcome to the Messenger</p>
          </div>
          <LoginButton />
        </div>
      </header>
    );
  return (
    <header className="flex items-center justify-between p-10 top-0 z-50 sticky bg-white shadow-sm">
      {/* left */}
      <div className="space-x-2 flex ">
        <Image
          className="object-cover mx-2 h-14 w-14 rounded-full cursor-pointer"
          src={session?.user?.image!}
          alt=""
          width={100}
          height={100}
        />
        <div>
          <p className="text-blue-400">Logged in as:</p>
          <p className="font-bold text-lg">{session?.user?.name}</p>
        </div>
      </div>
      {/* right */}
      <LogoutButton />
    </header>
  );
}

export default Header;
