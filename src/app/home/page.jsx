"use client";
import React, {  useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import QuesionsIndex from "../components/questions/QuestionIndex";
import clsx from "clsx";
import axios from "axios";
import SkeletonLoader from "./SkeletonLoader";
import { useQueries } from "@tanstack/react-query";

function Page() {
  const [startQuestions, setStartQuestions] = useState(false);
  const [userData, setUserData] = useState();

  const getEmployees = async () => {
    try {
      const employees = await axios.get("/api/getUsers");
      return employees.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getQuestions = async () => {
    try {
      const questions = await axios.get("/api/questions");
      return questions.data;
    } catch (error) {
      console.error(error);
    }
  };

  const [employees,questions] = useQueries({
    queries: [
      {
        queryKey: ["getemployees", 1],
        queryFn: () => getEmployees(),
        refetchInterval: 5000, // Fetch data every 5 seconds
        refetchOnWindowFocus: true, // Refetch on window focus
        refetchOnMount: true, // Refetch when component mounts
      },
      {
        queryKey: ["getquestions", 1],
        queryFn: () => getQuestions(),
        refetchInterval: 5000, // Fetch data every 5 seconds
        refetchOnWindowFocus: true, // Refetch on window focus
        refetchOnMount: true, // Refetch when component mounts
      },
    ],
  });

  return (
    <div className="">
      <Navbar />
      {startQuestions ? (
        <QuesionsIndex
          employees={employees.data}
          setStartQuestions={setStartQuestions}
          userData={userData}
          questions={questions.data}
        />
      ) : (
        <div className="  sm:w-[50%] w-[90%]  mx-auto  h-[88dvh]  flex flex-col justify-center">
          <h1 className="font-bold sm:text-xl mb-5 text-gray-700">
            Share Feedback
          </h1>
          {employees.data ? (
            <div className="border-2  rounded shadow-lg overflow-scroll h-[57dvh] sm:h-auto ">
              {employees.data?.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="flex hover:bg-green-50 cursor-pointer justify-between items-center px-3 py-5 border-b"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.imageUrl}
                        className="rounded-full w-12 h-12 hidden sm:block"
                        alt={item.fullname}
                        width={40}
                        height={40}
                      />
                      <p className="text-gray-600 font-semibold">
                        {item.fullname}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setStartQuestions(true);
                        setUserData(item);
                      }}
                      className={clsx({
                        "bg-green-600 sm:w-[30%] w-[45%] py-1 text-xs sm:text-base text-gray-100 rounded hover:bg-green-800 active:bg-green-900 cursor-pointe font-medium":
                          item.applicationStatus === "incomplete",
                        "bg-white border border-gray-400 text-xs sm:text-base text-gray-700 sm:w-[30%] w-[45%]  py-1 rounded cursor-pointer hover:bg-gray-300 hover:text-black font-medium":
                          item.applicationStatus === "complete",
                      })}
                    >
                      {item.applicationStatus === "complete"
                        ? "view submissions"
                        : " fill out"}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {[...Array(5)].map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Page;
