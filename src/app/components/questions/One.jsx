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
      <div className="border-2  rounded shadow-xl my-4 p-5">
        <ul className="flex flex-col gap-5">
          {props.data.answers.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-gray-100 cursor-pointer p-3 font-medium hover:bg-gray-500 hover:text-white"
              >
                <h1 className="font-bold">{item.title}</h1>
                <p className="text-sm sm:text-md">{item.body}</p>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default One;
