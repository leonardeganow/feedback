"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import Ratings from "../components/Ratings";
import FeedbackSkeletonLoader from "./FeedbackSkeletonLoader";

function Page() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [employeeId, setEmployeeId] = useState();
  const [loader, setLoader] = useState(true);

  const getFeedbacks = async () => {
    try {
      const response = await axios.get("/api/getfeedbacks");
      setFeedbacks(response.data);

      const firstFeedBack = response.data[0].employeeId._id;
      setEmployeeId(firstFeedBack);

      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);
  return (
    <div className="">
      <Navbar />
      {loader ? (
        <FeedbackSkeletonLoader />
      ) : (
        <div className="  sm:w-[70%] w-[90%]  mx-auto  h-[88dvh] overflow-scroll flex flex-col justify-center">
          {feedbacks.length !== 0 ? (
            <div>
              <h1 className="font-bold text-xl mb-5 text-gray-700">
                My Feedback
              </h1>
              <div className="border-2  rounded shadow-lg min-h-[70dvh]">
                <div className="grid grid-cols-12">
                  <div className="col-span-2 lg:col-span-4 border-r min-h-[70dvh]">
                    <p className="uppercase text-[7px] sm:text-[10px] font-bold text-gray-500 tracking-widest p-2 border-b">
                      feedbacks given
                    </p>
                    {feedbacks?.map((item) => {
                      return (
                        <div
                          key={item.employeeId._id}
                          onClick={() => setEmployeeId(item.employeeId._id)}
                          className="flex hover:bg-green-50 cursor-pointer justify-center lg:justify-between items-center px-3 py-5 border-b"
                        >
                          <div className="flex items-center gap-x-5">
                            <img
                              src={item.employeeId.imageUrl}
                              className="rounded-full w-8 h-8  block"
                              alt={item.employeeId.fullname}
                              // width={30}
                              // height={30}
                            />
                            <p className="text-gray-600 font-semibold hidden lg:block">
                              {item.employeeId.fullname}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className=" col-span-10 lg:col-span-8">
                    {feedbacks?.map((item, index) => {
                      if (item.employeeId._id === employeeId) {
                        return (
                          <div className="">
                            <h1 className="font-bold text-gray-600 p-4">
                              {item.employeeId.fullname}'s Feedback
                            </h1>
                            <div className="sm:flex justify-between items-center border-b p-5 font-semibold text-gray-600">
                              <div className="sm:w-2/6 text-sm">
                                {item.question1.id}
                              </div>
                              <div className="text-sm text-green-600 pt-2 sm:pt-0  w-1/2">
                                {item.question1.answer}
                              </div>
                            </div>
                            <div className="sm:flex justify-between  items-center border-b p-5 font-semibold text-gray-600">
                              <div className="sm:w-2/6 text-sm ">
                                {item.question2.id}
                              </div>
                              <div className=" w-1/2">
                                <Ratings
                                  setRatings={""}
                                  ratings={item.question2.answer}
                                  setValue={""}
                                  name={""}
                                  h={6}
                                  w={6}
                                />{" "}
                              </div>
                            </div>
                            <div className="sm:flex justify-between items-center border-b p-5 font-semibold text-gray-600">
                              <div className="sm:w-2/6 text-sm">
                                {item.question3.id}
                              </div>
                              <div className="text-sm text-green-600 pt-2 sm:pt-0  w-1/2">
                                {item.question3.answer}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
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
      )}
      <Footer />
    </div>
  );
}

export default Page;
