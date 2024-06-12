"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

// export const metadata = {
//   title: "feedback app",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <SessionProvider>
        <body>{children}</body>
      </SessionProvider>
    </html>
  );
}
