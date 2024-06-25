import clsx from "clsx";
import Image from "next/image";
import React, { useEffect } from "react";

function One(props) {

  useEffect(() => {
    props.answerFormHandler.setValue("question1.id", props.data._id);
  }, []);

  return (
    <div className="">
      <div className="flex justify-between mb-2">
        <div>
          <h1 className="text-sm sm:text-lg text-gray-700 font-semibold pb-1">
            {props.data.title}
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
          {props.data.answers.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  props.useFormHandler.setValue("answerOne", item.title);
                  props.answerFormHandler.setValue("question1.answer", item.title)
                }}
                className={clsx({
                  "bg-gray-100 cursor-pointer p-3 font-medium hover:bg-gray-500 hover:text-white": true,
                  "bg-gray-500 text-white":
                    props.useFormHandler.watch("answerOne") === item.title,
                })}
              >
                <h1 className="font-bold text-sm sm:text-md ">{item.title}</h1>
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
