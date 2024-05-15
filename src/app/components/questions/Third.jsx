import clsx from "clsx";
import Image from "next/image";
import React from "react";

function Third(props) {
  return (
    <div className="">
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
      <div className="border-r-2 border-t-2 border-l-2 mt-4 p-5">
        <textarea
          {...props.useFormHandler.register("answerThree")}
          className="resize-none rounded-md border w-full outline-none p-2 h-[20vh]"
          placeholder="Say something"
        ></textarea>
        <div className="flex justify-between text-xs capitalize pt-3 ">
          <button
            onClick={props.handleBack}
            className="bg-gray-400 font-semibold text-white w-[150px] rounded py-2 capitalize"
          >
            previous
          </button>

          <button
            onClick={props.handleNext}
            disabled={props.useFormHandler.watch("answerThree") === ""}
            className={clsx({
              "bg-green-600 font-semibold text-white w-[150px] rounded py-2 capitalize":
                props.useFormHandler.watch("answerThree"),
              "bg-gray-400 font-semibold text-white w-[150px] rounded py-2 capitalize":
                props.useFormHandler.watch("answerThree") === "",
            })}
          >
            {props.currentStep === 3 ? "submit" : "next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Third;
