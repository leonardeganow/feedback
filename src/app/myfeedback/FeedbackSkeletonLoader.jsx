import React from "react";
import "../home/skeleton.css";
function FeedbackSkeletonLoader() {
  return (
    <div className="sm:w-[70%] w-[90%] mx-auto h-[88dvh] overflow-scroll flex flex-col justify-center">
      <div>
        <h1 className="font-bold text-xl mb-5 text-gray-300">My Feedback</h1>
        <div className="border-2 rounded shadow-lg min-h-[70dvh]">
          <div className="grid grid-cols-12">
            <div className="col-span-2 lg:col-span-4 border-r min-h-[70dvh]">
              <p className="uppercase text-[7px] sm:text-[10px] font-bold text-gray-300 tracking-widest p-2 border-b">
                feedbacks given
              </p>
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex  hover:bg-gray-50 cursor-pointer justify-center lg:justify-between items-center px-3 py-5 border-b"
                >
                  <div className="flex items-center gap-x-5 ">
                    <div className="rounded-full bg-gray-300 w-8 h-8 skeleton"></div>
                    <p className="text-gray-300 font-semibold hidden lg:block w-24 h-4 bg-gray-300 rounded skeleton"></p>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-10 lg:col-span-8">
              {[...Array(1)].map((_, index) => (
                <div key={index} className="p-3">
                  <h1 className="font-bold text-gray-300 p-4 bg-gray-300 h-6 rounded w-1/6 skeleton"></h1>
                  <div className="sm:flex justify-between items-center border-b p-5 font-semibold text-gray-300">
                    <div className="sm:w-2/6 text-sm bg-gray-300 h-4 rounded skeleton"></div>
                    <div className="text-sm bg-gray-300 h-4 rounded w-1/2 skeleton mt-2 sm:mt-0"></div>
                  </div>
                  <div className="sm:flex justify-between items-center border-b p-5 font-semibold text-gray-300">
                    <div className="sm:w-2/6 text-sm bg-gray-300 h-4 rounded skeleton "></div>
                    <div className="w-1/2 bg-gray-300 h-4 rounded skeleton mt-2 sm:mt-0"></div>
                  </div>
                  <div className="sm:flex justify-between items-center border-b p-5 font-semibold text-gray-300">
                    <div className="sm:w-2/6 text-sm bg-gray-300 h-4 rounded skeleton"></div>
                    <div className="text-sm bg-gray-300 h-4 rounded w-1/2 skeleton mt-2 sm:mt-0"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackSkeletonLoader;
