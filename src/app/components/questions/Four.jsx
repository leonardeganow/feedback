import React from "react";
import Image from "next/image";
import pic1 from "/public/images/pic1.jpg";
import pic2 from "/public/images/pic2.jpg";
import pic3 from "/public/images/pic3.jpeg";
import pic4 from "/public/images/pic4.jpg";
import pic5 from "/public/images/pic5.jpg";

function Four() {
  const data = [
    {
      id: 1,
      image: pic1,
      name: "Chris Johnson",
    },
    {
      id: 2,
      image: pic2,
      name: "Nico Perez",
    },
    {
      id: 3,
      image: pic3,
      name: "Nathaniel Moon",
    },
  ];
  return (
    <div>
      <h1 className="font-bold text-2xl">
        Thnak you for sharing your feedback!
      </h1>
      <p className="text-gray-500 py-3">
        Continue to give feedback to other team members.
      </p>
      <div className="border-2  rounded shadow-lg">
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className="flex hover:bg-sky-100 cursor-pointer justify-between items-center px-3 py-5 border-b"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={item.image}
                  className="rounded-full w-12 h-12"
                  alt={item.name}
                />
                <p className="text-gray-600 font-semibold">{item.name}</p>
              </div>

              <button
                onClick={() => {
                  //   setStartQuestions(true);
                  //   setUserData(item);
                }}
                className="bg-green-700 px-10 py-1  text-gray-100 rounded hover:bg-green-800 active:bg-green-900 cursor-pointer"
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
