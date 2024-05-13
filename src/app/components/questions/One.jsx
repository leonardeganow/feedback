import Image from "next/image";
import React from "react";

function One() {
  const data = [
    {
      id: 1,
      title: "Please Improve ",
      body: "You may have done one or the following: Maybe you were mostly quiet in meetings and when you had something on your mind, you brought it to the team afterward. Or, you had feedback that would be valuable to go, but you found it too difficult. Or, you had an opportunity to grow by doing something uncomfortable but you didn’t.",
    },
    {
      id: 2,
      title: "You Were Good ",
      body: " You sometimes participate in meetings but you feel that they don’t always bring up important things when they should.",
    },
    {
      id: 3,
      title: "You Were Great ",
      body: " I and others can count on your courage to help the team do what is right.",
    },
  ];

  return (
    <div className="">
      <div className="border-2  rounded shadow-xl my-4 p-5">
        <ul className="flex flex-col gap-5">
          {data.map((item) => {
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
