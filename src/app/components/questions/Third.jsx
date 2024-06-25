import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect } from "react";
import { toast } from "sonner";

function Third(props) {

const postAnswer = async ()=>{
  const data = props.answerFormHandler.getValues()

  try {
    const response = await axios.post('/api/postanswer', data)
    if(response){
      toast(response.data.message)
      props.handleNext()
    }
  } catch (error) {
    console.error(error);
  }
}



  useEffect(() => {
    props.answerFormHandler.setValue("question3.id", props.data._id);
    props.answerFormHandler.setValue(
      "question3.answer",
      props.useFormHandler.watch("answerThree")
    );
  }, [props.useFormHandler.watch("answerThree")]);
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
          alt="profile pic"
          className="rounded-full w-12 h-12  sm:block hidden"
          width={40}
          height={40}
        />
      </div>
      <div className="border-r-2 border-t-2 border-l-2 mt-4 p-5">
        <textarea
          {...props.useFormHandler.register("answerThree")}
          className="resize-none rounded-md border w-full outline-none p-2 h-[20vh]"
          placeholder="Say something"
        ></textarea>
        <div className="flex justify-between text-xs capitalize pt-2 ">
          <button
            onClick={props.handleBack}
            className="bg-gray-400 font-semibold text-white w-[150px] rounded py-2 capitalize"
          >
            previous
          </button>

          <button
            onClick={postAnswer}
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
