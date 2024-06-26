import SkeletonLoader from "@/app/home/SkeletonLoader";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function Four(props) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState([]);

  const [employees, setEmployees] = React.useState([]);
  const getEmployees = async () => {
    try {
      const employees = await axios.get("/api/getUsers");
      setLoading(false);
      setEmployees(employees.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);
  return (
    <div>
      <h1 className="font-bold sm:text-2xl">
        Thank you for sharing your feedback!
      </h1>
      <p className="text-gray-500 py-3">
        Continue to give feedback to other team members.
      </p>
      {!loading ? (
        <div>
          {employees?.filter((item) => item.status === "incomplete").length === 0 ? (
            <div>You have given every employee a feedback</div>
          ) : (
            <div className="border-2  rounded shadow-lg">
              {employees
                ?.filter((item) => item.status === "incomplete")
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
                        <p className="text-gray-600 font-semibold text-sm sm:text-base">
                          {item.fullname}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          props.handleBack(3);
                          props.setUserData(item);
                          props.answerFormHandler.setValue(
                            "employeeId",
                            item._id
                          );
                          props.answerFormHandler.setValue(
                            "userId",
                            session.user.email
                          );
                          props.answerFormHandler.setValue(
                            "question1.answer",
                            ""
                          );
                          props.answerFormHandler.setValue(
                            "question2.answer",
                            ""
                          );
                          props.answerFormHandler.setValue(
                            "question3.answer",
                            ""
                          );
                        }}
                        className="bg-green-700 px-10 py-1 text-sm sm:text-base  text-gray-100 rounded hover:bg-green-800 active:bg-green-900 cursor-pointer"
                      >
                        fill out
                      </button>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      ) : (
        <div>
          {[...Array(2)].map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Four;
