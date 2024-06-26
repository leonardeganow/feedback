import Image from "next/image";
import React, { useEffect, useState } from "react";
import Ratings from "../Ratings";
import clsx from "clsx";

function Two(props) {
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    props.answerFormHandler.setValue("question2.id", props.data._id);
    props.answerFormHandler.setValue("question2.answer", ratings.toString());
  }, [ratings]);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <div>
          <h1 className="text-sm sm:text-lg text-gray-700 font-semibold pb-1">
            {props.data.title}
          </h1>
          <p className="text-[#ACB1B6] font-semibold tracking-[4px] sm:text-xs text-[10px]  uppercase">
            share your feedback for {props.userData.fullnamae}
          </p>
        </div>

        <img
          src={props.userData.imageUrl}
          alt="profile pic"
          className="rounded-full w-12 h-12  sm:block hidden"
          width={40}
          height={40}
        />
      </div>

      <div className="border-r-2 border-t-2 border-l-2  flex flex-col justify-center  p-3">
        <Ratings
          setRatings={setRatings}
          ratings={ratings}
          setValue={props.answerFormHandler.setValue}
          name={"question2.answer"}
        />
        <div className="text-center pt-4 text-gray-700 font-bold">
          {ratings}/10
        </div>
        <div className="flex justify-between text-xs capitalize pt-3 ">
          <button
            onClick={()=> props.handleBack(1)}
            className="bg-gray-400 font-semibold text-white w-[150px] rounded py-2 capitalize"
          >
            previous
          </button>

          <button
            onClick={()=>props.handleNext(1)}
            disabled={props.answerFormHandler.watch("question2.answer") === ""}
            className={clsx({
              "bg-green-600 font-semibold text-white w-[150px] rounded py-2 capitalize":
              props.answerFormHandler.watch("question2.answer"),
              "bg-gray-400 font-semibold text-white w-[150px] rounded py-2 capitalize":
              props.answerFormHandler.watch("question2.answer") === "",
            })}
          >
            {props.currentStep === 3 ? "submit" : "next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Two;
