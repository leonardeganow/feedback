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

function page() {
  const [startQuestions, setStartQuestions] = useState(false);
  const [userData, setUserData] = useState();
  const data = [
    {
      id: 1,
      image: pic1,
      name: "Chris Johnson",
    },
    {
      id: 2,
      image: pic2,
      name: "Nico Perez",
    },
    {
      id: 3,
      image: pic3,
      name: "Nathaniel Moon",
    },
    {
      id: 4,
      image: pic4,
      name: "Denis Denison",
    },
    {
      id: 5,
      image: pic5,
      name: "Paul Carter",
    },
  ];

  return (
    <div className="flex flex-col items-between justify-between h-screen">
      <Navbar />
      {startQuestions ? (
        <QuesionsIndex setStartQuestions={setStartQuestions} userData={userData}/>
      ) : (
        <div className="  sm:w-[50%] w-[95%]  mx-auto">
          <h1 className="font-bold text-xl mb-5 text-gray-700">Share Feedback</h1>
          <div className="border-2  rounded shadow-lg">
            {data.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex hover:bg-sky-100 cursor-pointer justify-between items-center px-3 py-5 border-b"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.image}
                      className="rounded-full w-12 h-12"
                      alt={item.name}
                    />
                    <p className="text-gray-600 font-semibold">{item.name}</p>
                  </div>

                  <button
                    onClick={() => {
                      setStartQuestions(true);
                      setUserData(item);
                    }}
                    className="bg-green-700 px-10 py-1  text-gray-100 rounded hover:bg-green-800 active:bg-green-900 cursor-pointer"
                  >
                    fill out
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