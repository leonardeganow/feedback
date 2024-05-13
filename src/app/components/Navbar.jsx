import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import profilepic from "../../../public/images/profilepic.png"

function Navbar() {
  const pathname = usePathname();
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

  return (
    <div className="h-[7vh]  flex justify-between items-center sm:px-20 px-5 bg-gray-100">
      <div className="font-black text-xl">Feedback</div>
      <div className="sm:flex gap-16 hidden">
        {navOptions.map((option) => {
          return (
            <div
              key={option.id}
              className={`relative font-semibold text-gray-700 cursor-pointer hover:border-b-2 hover:border-green-600 ${
                pathname === option.href ? "border-b-2 border-green-600" : ""
              }  h-[7vh] flex items-center px-5 `}
            >
              <Link href={option.href}>{option.title}</Link>
              <div className="bg-green-600 text-gray-100 text-[8px] flex justify-center items-center  rounded-full w-4 h-4 absolute -right-0 top-3">
                {option.notifications}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-sm flex items-center gap-3">
        <Image src={profilepic} alt="" width={30} height={30} className=" rounded-full"/>
        <div>
          <h1 className="text-gray-600">Leonard Adjei</h1>
          <Link href="/" className="text-red-500  tracking-widest">
           <p className="text-[10px] font-bold text-gray-500">LOGOUT</p> 
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
