import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { toast } from "sonner";

function Third(props) {
  const [loader, setLoader] = useState(false);

  const postAnswer = async () => {
    setLoader(true);
    const data = props.answerFormHandler.getValues();
    console.log(data);

    try {
      const response = await axios.post("/api/postanswer", data);
      if (response) {
        setLoader(false);

        props.answerFormHandler.reset();
        toast(response.data.message);
        props.handleNext(1);
      }
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    props.answerFormHandler.setValue("question3.id", props.data.title);
    props.answerFormHandler.setValue(
      "question3.answer",
      props.answerFormHandler.watch("question3.answer")
    );
  }, [props.answerFormHandler.watch("question3.answer")]);
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
          {...props.answerFormHandler.register("question3.answer")}
          className="resize-none rounded-md border w-full outline-none p-2 h-[20vh]"
          placeholder="Say something"
        ></textarea>
        <div className="flex justify-between text-xs capitalize pt-2 ">
          <button
            onClick={() => props.handleBack(1)}
            className="bg-gray-400 font-semibold text-white w-[150px] rounded py-2 capitalize"
          >
            previous
          </button>

          <button
            onClick={postAnswer}
            disabled={loader}
            className={clsx({
              "bg-green-600 font-semibold text-white w-[150px] rounded py-2 capitalize":
                props.answerFormHandler.watch("question3.answer"),
              "bg-gray-400 font-semibold text-white w-[150px] rounded py-2 capitalize":
                props.answerFormHandler.watch("question3.answer") === "",
            })}
          >
            {loader ? (
              <div className="flex justify-center items-center">
                <Oval
                  visible={true}
                  width="25"
                  height="30"
                  color="white"
                  ariaLabel="infinity-spin-loading"
                />
              </div>
            ) : (
              "submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Third;
