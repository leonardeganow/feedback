"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import logo from "../../../public/images/feed.png";
import { useSession, signOut } from "next-auth/react";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!session && !isLoading) {
      router.push("/");
    }
  }, [session, isLoading, router]);

  const navOptions = [
    {
      title: "Share feedback",
      notifications: "2",
      href: "/home",
      id: 1,
    },
    {
      title: "My feedback",
      notifications: "8",
      href: "/myfeedback",
      id: 2,
    },
    {
      title: "Team feedback",
      notifications: "",
      href: "/teamfeedback",
      id: 3,
    },
  ];

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ redirect: false });
    router.push("/");
    setIsLoading(false);
  };

  return (
    <div className="h-[7vh] flex justify-between items-center sm:px-20 px-5 bg-gray-100">
      <Link href="/test">
        <Image src={logo} width={150} height={50} alt="logo" priority />
      </Link>
      <div className="sm:flex gap-16 hidden">
        {navOptions.map((option) => (
          <div
            key={option.id}
            className={`relative font-semibold text-gray-700 cursor-pointer hover:border-b-2 hover:border-green-600 ${
              pathname === option.href ? "border-b-2 border-green-600" : ""
            } h-[7vh] flex items-center px-5`}
          >
            <Link href={option.href}>{option.title}</Link>
            {option.notifications && (
              <div className="bg-green-600 text-gray-100 text-[8px] flex justify-center items-center rounded-full w-4 h-4 absolute -right-0 top-3">
                {option.notifications}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-sm flex items-center gap-3">
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt=""
            width={30}
            height={30}
            className="rounded-full"
          />
        )}
        <div>
          <h1 className="text-gray-600">{session?.user?.name}</h1>
          <button
            onClick={handleSignOut}
            className="text-red-500 tracking-widest"
          >
            <p className="text-[10px] font-bold text-gray-500">LOGOUT</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
