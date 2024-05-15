"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function page() {
  const [feedbacks, setFeedbacks] = useState();
  return (
    <div className="flex flex-col items-between  h-screen">
      <Navbar />
      <div className="  sm:w-[50%] w-[95%]  mx-auto  min-h-[88vh] pt-14">
        {feedbacks ? (
          <div>
            <h1 className="font-bold text-xl mb-5 text-gray-700">
              My Feedback
            </h1>
            <div className="border-2  rounded shadow-lg"></div>
          </div>
        ) : (
          <div className="border p-5 shadow">
            <h1 className="text-4xl font-bold">No feedback to display 🔮</h1>
            <p className="py-5">
              There is no feedback to display at this time – check back in a
              bit!{" "}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default page;
