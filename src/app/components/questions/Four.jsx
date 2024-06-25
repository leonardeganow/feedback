import React from "react";
import Image from "next/image";

function Four(props) {
  return (
    <div>
      <h1 className="font-bold sm:text-2xl">
        Thank you for sharing your feedback!
      </h1>
      <p className="text-gray-500 py-3">
        Continue to give feedback to other team members.
      </p>
      <div className="border-2  rounded shadow-lg">
        {props.employees
          .filter((item) => item.applicationStatus === "incomplete")
          .map((item) => {
            return (
              <div
                key={item._id}
                className="flex hover:bg-sky-100 cursor-pointer justify-between items-center px-3 py-5 border-b"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.imageUrl}
                    className="rounded-full w-12 h-12"
                    alt={item.fullname}
                    width={40}
                    height={40}
                  />
                  <p className="text-gray-600 font-semibold text-sm sm:text-base">{item.fullname}</p>
                </div>

                <button
                  onClick={() => {
                    //   setStartQuestions(true);
                    //   setUserData(item);
                  }}
                  className="bg-green-700 px-10 py-1 text-sm sm:text-base  text-gray-100 rounded hover:bg-green-800 active:bg-green-900 cursor-pointer"
                >
                  fill out
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Four;
