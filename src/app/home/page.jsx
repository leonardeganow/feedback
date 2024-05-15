"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import pic1 from "/public/images/pic1.jpg";
import pic2 from "/public/images/pic2.jpg";
import pic3 from "/public/images/pic3.jpeg";
import pic4 from "/public/images/pic4.jpg";
import pic5 from "/public/images/pic5.jpg";
import QuesionsIndex from "../components/questions/QuestionIndex";
import clsx from "clsx";

function page() {
  const [startQuestions, setStartQuestions] = useState(false);
  const [userData, setUserData] = useState();
  const data = [
    {
      id: 1,
      image: pic1,
      name: "Chris Johnson",
      status: "incomplete",
    },
    {
      id: 2,
      image: pic2,
      name: "Nico Perez",
      status: "incomplete",
    },
    {
      id: 3,
      image: pic3,
      name: "Nathaniel Moon",
      status: "complete",
    },
    {
      id: 4,
      image: pic4,
      name: "Denis Denison",
      status: "complete",
    },
    {
      id: 5,
      image: pic5,
      name: "Paul Carter",
      status: "complete",
    },
  ];

  return (
    <div className="flex flex-col  h-screen">
      <Navbar />
      {startQuestions ? (
        <QuesionsIndex
          setStartQuestions={setStartQuestions}
          userData={userData}
        />
      ) : (
        <div className="  sm:w-[50%] w-[95%]  mx-auto  min-h-[88vh] pt-14">
          <h1 className="font-bold text-xl mb-5 text-gray-700">
            Share Feedback
          </h1>
          <div className="border-2  rounded shadow-lg">
            {data.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex hover:bg-green-50 cursor-pointer justify-between items-center px-3 py-5 border-b"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.image}
                      className="rounded-full w-12 h-12 hidden sm:block"
                      alt={item.name}
                    />
                    <p className="text-gray-600 font-semibold">{item.name}</p>
                  </div>

                  <button
                    onClick={() => {
                      setStartQuestions(true);
                      setUserData(item);
                    }}
                    className={clsx({
                      "bg-green-600 sm:w-[30%] w-[45%] py-1  text-gray-100 rounded hover:bg-green-800 active:bg-green-900 cursor-pointe font-medium":
                        item.status === "incomplete",
                      "bg-white border border-gray-400 text-gray-700 sm:w-[30%] w-[45%]  py-1 rounded cursor-pointer hover:bg-gray-300 hover:text-black font-medium":
                        item.status === "complete",
                    })}
                  >
                    {item.status === "complete"
                      ? "view submissions"
                      : " fill out"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default page;
