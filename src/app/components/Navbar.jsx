// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import logo from "../../../public/images/feed.png";
// import { useSession, signOut } from "next-auth/react";

// function Navbar() {
//   const pathname = usePathname();
//   const { data: session } = useSession();

//   const navOptions = [
//     {
//       title: "Share feedback",
//       notifications: "2",
//       href: "/home",
//       id: 1,
//     },
//     {
//       title: "My feedback",
//       notifications: "8",
//       href: "/myfeedback",
//       id: 2,
//     },
//     {
//       title: "Team feedback",
//       notifications: "",
//       href: "/teamfeedback",
//       id: 3,
//     },
//   ];

//   const handleSignOut = async () => {
//     await signOut({ callbackUrl: "/" });
//   };

//   return (
//     <div className="h-[7h] flex justify-between items-center sm:px-20 px-5 bg-gray-100">
//       <Link href="/test">
//         <Image src={logo} width={120} height={50} alt="logo" priority />
//       </Link>
//       <div className="sm:flex gap-16 hidden">
//         {navOptions.map((option) => (
//           <div
//             key={option.id}
//             className={`relative font-semibold text-gray-700 cursor-pointer hover:border-b-2 hover:border-green-600 ${
//               pathname === option.href ? "border-b-2 border-green-600" : ""
//             } h-[10vh] flex items-center px-5`}
//           >
//             <Link href={option.href}>{option.title}</Link>
//             {option.notifications && (
//               <div className="bg-green-600 text-gray-100 text-[8px] flex justify-center items-center rounded-full w-4 h-4 absolute -right-0 top-3">
//                 {option.notifications}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="text-sm flex items-center gap-3">
//         {session?.user?.image && (
//           <Image
//             src={session.user.image}
//             alt=""
//             width={30}
//             height={30}
//             className="rounded-full"
//           />
//         )}
//         <div>
//           <h1 className="text-gray-600">{session?.user?.name}</h1>
//           <button
//             onClick={handleSignOut}
//             className="text-red-500 tracking-widest"
//           >
//             <p className="text-[10px] font-bold text-gray-500">LOGOUT</p>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import logo from "../../../public/images/feed.png";
import { useSession, signOut } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";

function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

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
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="h-[7dvh] flex justify-between items-center relative z-20 sm:px-20 px-5 bg-gray-100">
      <Link href="/test">
        <Image src={logo} width={80} height={50} alt="logo" priority />
      </Link>
      <div className="hidden sm:flex gap-16">
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

      <div className="sm:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700"
        >
          {menuOpen ? (
            <MdOutlineCancel className="w-6 h-6" />
          ) : (
            <GiHamburgerMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      <div className="hidden sm:flex text-sm items-center gap-3">
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

      <div
        className={`transition-transform transform absolute -z-10 ${
          menuOpen ? "translate-y-0" : "-translate-y-[500px]"
        } sm:hidden absolute top-14 left-0 right-0 bg-white shadow-md z-10`}
      >
        <div className="flex flex-col gap-3 p-5">
          {navOptions.map((option) => (
            <div
              key={option.id}
              className={`relative font-semibold text-gray-700 cursor-pointer text-sm hover:border-b-2 hover:border-green-600 ${
                pathname === option.href ? "border-b-2 border-green-600" : ""
              } h-[5vh] flex items-center px-5`}
            >
              <Link href={option.href}>{option.title}</Link>
              {option.notifications && (
                <div className="bg-green-600 text-gray-100 text-[8px] flex justify-center items-center rounded-full w-4 h-4 absolute -right-0 top-3">
                  {option.notifications}
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center gap-3 mt-3">
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt=""
                width={25}
                height={25}
                className="rounded-full"
              />
            )}
            <div>
              <h1 className="text-gray-600 text-sm">{session?.user?.name}</h1>
              <button
                onClick={handleSignOut}
                className="text-red-500 tracking-widest"
              >
                <p className="text-[10px] font-bold text-gray-500">LOGOUT</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
