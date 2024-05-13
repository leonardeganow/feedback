import React, { useState } from "react";
import One from "./One";
import Two from "./Two";
import Image from "next/image";
import { IoChevronBack } from "react-icons/io5";

function QuesionsIndex(props) {
  const [currentStep, setCurrentStep] = useState(1); //NOTE - this tracks the current step of the whole form
  const totalSteps = 3; //NOTE - total steps for the whole form

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep <= 1) {
      return;
    }
    setCurrentStep((prev) => prev - 1);
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <One />;
      case 2:
        return <Two />;
      default:
        return null;
    }
  };
  return (
    <div className=" sm:w-[50%] w-[95%]  mx-auto py-10 sm:py-0">
      <h1
        onClick={() => props.setStartQuestions(false)}
        className="font-bold text-sm mb-1 text-gray-400 cursor-pointer flex items-center gap-2"
      >
       <IoChevronBack size={20}/> BACK
      </h1>
      <div className="flex justify-between mb-5">
        <div>
          <h1 className="sm:text-lg text-gray-700 font-semibold pb-3">
            How well did i display courage?
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
      {renderForm()}
      <div className="flex justify-between text-xs capitalize pt-7">
        <button
          onClick={handleBack}
          className="bg-[#ACB1B6] text-white w-[150px] rounded py-2 capitalize"
        >
          previous
        </button>

        <button
          onClick={handleNext}
          className="bg-green-700 text-white w-[150px] rounded py-2 capitalize hover:bg-green-900 active:bg-green-800"
        >
          next
        </button>
      </div>
    </div>
  );
}

export default QuesionsIndex;
