import Image from "next/image";
import React, { useState } from "react";
import Ratings from "../Ratings";
import clsx from "clsx";

function Two(props) {
  const [ratings, setRatings] = useState(0);

  return (
    <div>
      <div className="flex justify-between mb-5">
        <div>
          <h1 className="sm:text-lg text-gray-700 font-semibold pb-3">
            {props.data.title}
          </h1>
          <p className="text-[#ACB1B6] font-semibold tracking-[4px] sm:text-xs text-[10px]  uppercase">
            share your feedback for {props.userData.name}
          </p>
        </div>

        <Image
          src={props.userData.image}
          alt="profile pic"
          className="rounded-full w-12 h-12"
        />
      </div>

      <div className="border-r-2 border-t-2 border-l-2  flex flex-col justify-center  p-3">
        <Ratings setRatings={setRatings} ratings={ratings} setValue={props.useFormHandler.setValue} name={"answerTwo"} />
        <div className="text-center pt-4 text-gray-700 font-bold">
          {ratings}/10
        </div>
        <div className="flex justify-between text-xs capitalize pt-3 ">
          <button
            onClick={props.handleBack}
            className="bg-gray-400 font-semibold text-white w-[150px] rounded py-2 capitalize"
          >
            previous
          </button>

          <button
            onClick={props.handleNext}
            disabled={props.useFormHandler.watch("answerTwo") === ""}
            className={clsx({
              "bg-green-600 font-semibold text-white w-[150px] rounded py-2 capitalize":
                props.useFormHandler.watch("answerTwo"),
              "bg-gray-400 font-semibold text-white w-[150px] rounded py-2 capitalize":
                props.useFormHandler.watch("answerTwo") === "",
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
