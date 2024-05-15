import React, { useState } from "react";
import One from "./One";
import Two from "./Two";
import { IoChevronBack } from "react-icons/io5";
import { questions } from "@/app/api";
import Third from "./Third";
import Four from "./Four";
import { useForm } from "react-hook-form";
import { defaultFormValues } from "./defaultFormValues";
import clsx from "clsx";

function QuesionsIndex(props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selected, setSelected] = useState(false);
  const totalSteps = 3;

  const useFormHandler = useForm({
    defaultValues: defaultFormValues,
  });

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
        return (
          <One
            userData={props.userData}
            data={questions[0]}
            useFormHandler={useFormHandler}
            setSelected={setSelected}
            handleBack={handleBack}
            handleNext={handleNext}
            currentStep={currentStep}
          />
        );
      case 2:
        return (
          <Two
            userData={props.userData}
            data={questions[1]}
            useFormHandler={useFormHandler}
            setSelected={setSelected}
            handleBack={handleBack}
            handleNext={handleNext}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <Third
            userData={props.userData}
            data={questions[2]}
            useFormHandler={useFormHandler}
            setSelected={setSelected}
            handleBack={handleBack}
            handleNext={handleNext}
            currentStep={currentStep}
          />
        );
      default:
        return <Four />;
    }
  };
  return (
    <div className=" sm:w-[50%] w-[95%]  mx-auto py-10 sm:py-0">
      {currentStep !== 4 && (
        <h1
          onClick={() => props.setStartQuestions(false)}
          className="font-bold text-sm mb-1 text-gray-400 cursor-pointer flex items-center gap-2 hover:text-green-500 active:text-green-700"
        >
          <IoChevronBack size={20} /> BACK
        </h1>
      )}

      {renderForm()}
      {currentStep !== 4 && (
        <div className="  border-l-2 border-b-2 border-r-2  p-5">
          <div className="pt-3">
            <div className="w-full mt-4 bg-gray-200 rounded-full h-2 dark:bg-gray-400">
              <div
                className="bg-gradient-to-r from-green-400 to-teal-500 h-2 rounded-full"
                style={{ width: `${(currentStep / questions.length) * 100}%` }}
              ></div>
            </div>

            <h1 className="uppercase text-xs font-bold pt-3">
              Questions completed
            </h1>
            <p className="text-xs pt-3">
              {currentStep}/{questions.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuesionsIndex;
