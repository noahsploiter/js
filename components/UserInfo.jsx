"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import TheGame from "./TheGame";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="">
      <div className="flex">
        <div>
          Name: <span className="">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="">{session?.user?.email}</span>
        </div>
        <div>
          Balance: <span className="">{session?.user?.balance}</span>
        </div>
      </div>
      <TheGame />
      <div className="flex m-3 justify-end inset-x-0 absolute bottom-0 ">
        <button
          onClick={() => signOut()}
          className="bg-red-400 text-white font-bold w-[120px] h-[45px] rounded-xl"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
