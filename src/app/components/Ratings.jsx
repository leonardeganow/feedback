import React, { useState } from "react";

function Ratings(props) {
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
    <div className="flex justify-center gap-2 items-center mt-4 ">
      {ratingsOptions.map((rating) => {
        return (
          <div
            key={rating.id}
            onClick={() => {
              props.setRatings(rating.value);
              props.setValue(props.name, rating.value)
            }}
            className={`sm:w-16 sm:h-16 w-10 h-10 cursor-pointer  ${
              props.ratings >= rating.value ? "bg-green-500" : "bg-gray-200"
            }`}
          ></div>
        );
      })}
    </div>
  );
}

export default Ratings;
