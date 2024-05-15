import Link from "next/link";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Custom404() {
  return (
    <div className="flex flex-col items-between justify-between h-screen">
      <Navbar />
      <div className="  sm:w-[50%] w-[95%]  mx-auto border-2 px-5 py-8 shadow">
        <p className="font-bold text-gray-700  mb-5">404</p>
        <h1 className="text-4xl font-bold  mb-10 text-gray-700">
          Sorry! The page you are looking for cannot be found. 😢
        </h1>
        <Link href="/home" className="bg-green-700 text-white px-5 py-2 rounded hover:bg-green-800">Back to home</Link>
      </div>
      <Footer />
    </div>
  );
}
