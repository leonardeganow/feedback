import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function One(props) {
  const [questionOne, setQuestionOne] = useState();
  const [loader, setLoader] = useState(true);
  const getQuestionOne = async () => {
    try {
      const questions = await axios.get("/api/questions");
      setLoader(false);
      setQuestionOne(questions.data[0]);
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getQuestionOne();
    props.answerFormHandler.setValue("question1.id", questionOne?.title);
  }, [questionOne]);

  return (
    <div>
      {loader ? (
        <div className="">
          <div className="flex justify-between mb-2 pt-2">
            <div>
              <div className="h-4 bg-gray-300 rounded w-32 mb-1 skeleton"></div>
              <div className="h-3 bg-gray-300 rounded w-48 skeleton "></div>
            </div>
            <div className="rounded-full bg-gray-300 w-12 h-12 sm:block hidden skeleton"></div>
          </div>
          <div className="border-r-2 border-t-2 border-l-2 mt-2 px-5 py-2">
            <div className="flex flex-col gap-2 gap-y-5">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded skeleton">
                  <div className="h-4 bg-gray-300 rounded mb-1 skeleton"></div>
                  <div className="h-3 bg-gray-300 rounded skeleton"></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs capitalize pt-3">
              <div className="bg-gray-300 h-8 w-32 rounded skeleton"></div>
              <div className="bg-gray-300 h-8 w-32 rounded skeleton"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="flex justify-between mb-2">
            <div>
              <h1 className="text-sm sm:text-lg text-gray-700 font-semibold pb-1">
                {questionOne?.title}
              </h1>
              <p className="text-[#ACB1B6] font-semibold tracking-[4px] sm:text-xs text-[10px]  uppercase">
                share your feedback for {props.userData.fullname}
              </p>
            </div>

            <img
              src={props.userData.imageUrl}
              className="rounded-full w-12 h-12  sm:block hidden"
              alt="profile pic"
              width={40}
              height={40}
            />
          </div>
          <div className="border-r-2 border-t-2 border-l-2 mt-2 px-5 py-2">
            <div className="flex flex-col gap-2">
              {questionOne?.answers.map((item) => {
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      // props.useFormHandler.setValue("answerOne", item.title);
                      props.answerFormHandler.setValue(
                        "question1.answer",
                        item.title
                      );
                    }}
                    className={clsx({
                      "bg-gray-100 cursor-pointer p-3 font-medium hover:bg-gray-500 hover:text-white": true,
                      "bg-gray-500 text-white":
                        props.answerFormHandler.watch("question1.answer") ===
                        item.title,
                    })}
                  >
                    <h1 className="font-bold text-sm sm:text-md ">
                      {item.title}
                    </h1>
                    <p className="text-sm sm:text-md  font-light">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs capitalize pt-3 ">
              <button
                onClick={() => props.handleBack(0)}
                className="bg-gray-400 font-semibold text-white w-[150px] rounded py-2 capitalize"
              >
                previous
              </button>

              <button
                onClick={() => props.handleNext(1)}
                disabled={
                  props.answerFormHandler.watch("question1.answer") === ""
                }
                className={clsx({
                  "bg-green-600 font-semibold text-white w-[150px] rounded py-2 capitalize":
                    props.answerFormHandler.watch("question1.answer"),
                  "bg-gray-400 font-semibold text-white w-[150px] rounded py-2 capitalize":
                    props.answerFormHandler.watch("question1.answer") === "",
                })}
              >
                {props.currentStep === 3 ? "submit" : "next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default One;
