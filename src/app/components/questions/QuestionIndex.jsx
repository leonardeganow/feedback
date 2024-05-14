import React, { useState } from "react";
import One from "./One";
import Two from "./Two";
import Image from "next/image";
import { IoChevronBack } from "react-icons/io5";
import { questions } from "@/app/api";

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
        return <One userData={props.userData} data={questions[0]} />;
      case 2:
        return <Two userData={props.userData} data={questions[1]} />;
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
        <IoChevronBack size={20} /> BACK
      </h1>

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
      <div className="pb-5">
        <div className="w-full mt-4 bg-gray-200 rounded-full h-2 dark:bg-gray-400">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${(currentStep / questions.length) * 100}%` }}
          ></div>
        </div>

        <h1 className="uppercase text-xs font-bold py-2">
          Questions completed
        </h1>
        <p className="text-xs">
          {currentStep}/{questions.length}
        </p>
      </div>
    </div>
  );
}

export default QuesionsIndex;
