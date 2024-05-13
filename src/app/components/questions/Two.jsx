import Image from "next/image";
import React, { useState } from "react";

function Two() {
  const [ratings, setRatings] = useState(0);
  const ratingsOptions = [
    {
      id: 1,
      value: 1,
    },
    {
      id: 2,
      value: 2,
    },
    {
      id: 3,
      value: 3,
    },
    {
      id: 4,
      value: 4,
    },
    {
      id: 5,
      value: 5,
    },
    {
      id: 6,
      value: 6,
    },
    {
      id: 7,
      value: 7,
    },
    {
      id: 8,
      value: 8,
    },
    {
      id: 9,
      value: 9,
    },
    {
      id: 10,
      value: 10,
    },
  ];

  return (
    <div className="border-2  shadow-xl rounded  min-h-[25vh] flex flex-col justify-center p-3">
      <div className="flex justify-center gap-1 items-center ">
        {ratingsOptions.map((rating) => {
          return (
            <div
              key={rating.id}
              onClick={() => {
                setRatings(rating.value);
              }}
              class={`sm:w-16 sm:h-16 w-10 h-10 cursor-pointer  ${
                ratings >= rating.value ? "bg-green-500" : "bg-gray-200"
              }`}
            ></div>
          );
        })}
      </div>
      <div className="text-center py-5 text-gray-700 font-bold">{ratings}/10</div>
    </div>
  );
}

export default Two;
