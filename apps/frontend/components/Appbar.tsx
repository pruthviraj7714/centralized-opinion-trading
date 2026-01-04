"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Appbar() {
  const session = useSession();

  const router = useRouter();
  const handleSignout = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex justify-between bg-zinc-600 items-center p-4 border-b border-black">
      <div
      className="cursor-pointer font-bold"
        onClick={() => {
          router.push(session.status === "authenticated" ? "/dashboard" : "/");
        }}
      >
        Opinion
        <span className="ml-1 text-white text-xl">X</span>
      </div>
      {session.status === "authenticated" ? (
        <div>
          <Button variant={"destructive"} onClick={handleSignout}>
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <div>
            <Button
              variant={"outline"}
              onClick={() => router.push("/register")}
            >
              Register
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
