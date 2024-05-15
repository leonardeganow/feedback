import clsx from "clsx";
import Image from "next/image";
import React from "react";

function One(props) {

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
        <div className="flex flex-col gap-5">
          {props.data.answers.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  props.useFormHandler.setValue("answerOne", item.title);
                }}
                className={clsx({
                  "bg-gray-100 cursor-pointer p-3 font-medium hover:bg-gray-500 hover:text-white": true,
                  "bg-gray-500 text-white":
                    props.useFormHandler.watch("answerOne") === item.title,
                })}
              >
                <h1 className="font-bold  ">{item.title}</h1>
                <p className="text-sm sm:text-md  font-light">{item.body}</p>
              </div>
            );
          })}
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
            disabled={props.useFormHandler.watch("answerOne") === ""}
            className={clsx({
              "bg-green-600 font-semibold text-white w-[150px] rounded py-2 capitalize":
                props.useFormHandler.watch("answerOne"),
              "bg-gray-400 font-semibold text-white w-[150px] rounded py-2 capitalize":
                props.useFormHandler.watch("answerOne") === "",
            })}
          >
            {props.currentStep === 3 ? "submit" : "next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default One;
