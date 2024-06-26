import React, { useState } from "react";
import One from "./One";
import Two from "./Two";
import { IoChevronBack } from "react-icons/io5";
import Third from "./Third";
import Four from "./Four";
import { useForm } from "react-hook-form";
import { defaultFormValues } from "./defaultFormValues";

function QuesionsIndex(props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selected, setSelected] = useState(false);
  const totalSteps = 3;

  const useFormHandler = useForm({
    defaultValues: defaultFormValues,
  });

  const handleNext = (item) => {
    setCurrentStep((prev) => prev + item);
  };

  const handleBack = (item) => {
    if (currentStep <= 1) {
      return;
    }
    setCurrentStep((prev) => prev - item);
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <One
            userData={props.userData}
            data={props.questions[0]}
            useFormHandler={useFormHandler}
            setSelected={setSelected}
            handleBack={handleBack}
            handleNext={handleNext}
            currentStep={currentStep}
            answerFormHandler={props.answerFormHandler}
          />
        );
      case 2:
        return (
          <Two
            userData={props.userData}
            data={props.questions[1]}
            useFormHandler={useFormHandler}
            setSelected={setSelected}
            handleBack={handleBack}
            handleNext={handleNext}
            currentStep={currentStep}
            answerFormHandler={props.answerFormHandler}
          />
        );
      case 3:
        return (
          <Third
            userData={props.userData}
            data={props.questions[2]}
            useFormHandler={useFormHandler}
            setSelected={setSelected}
            handleBack={handleBack}
            handleNext={handleNext}
            currentStep={currentStep}
            answerFormHandler={props.answerFormHandler}
          />
        );
      default:
        return (
          <Four
            employees={props.employees}
            handleBack={handleBack}
            setStartQuestions={props.setStartQuestions}
            setUserData={props.setUserData}
            answerFormHandler={props.answerFormHandler}

          />
        );
    }
  };
  return (
    <div className=" sm:w-[50%] w-[90%]  mx-auto  min-h-[88dvh]  py-10 sm:pt-14">
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
        <div className="  border-l-2 border-b-2 border-r-2  p-5 ">
          <div className="">
            <div className="w-full mt-4 bg-gray-200 rounded-full h-2 dark:bg-gray-400">
              <div
                className="bg-gradient-to-r from-green-400 to-teal-500 h-2 rounded-full"
                style={{
                  width: `${(currentStep / props.questions.length) * 100}%`,
                }}
              ></div>
            </div>

            <h1 className="uppercase text-xs font-bold pt-3">
              Questions completed
            </h1>
            <p className="text-xs pt-3">
              {currentStep}/{props.questions.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuesionsIndex;
