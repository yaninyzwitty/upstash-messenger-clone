"use client";

import { signIn } from "next-auth/react";

function LoginButton() {
  return (
    <button
      // href={`/signIn`}
      onClick={() => signIn("google")}
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 font-bold rounded-md"
    >
      Sign In
    </button>
  );
}

export default LoginButton;
