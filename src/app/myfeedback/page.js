"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import pic1 from "/public/images/pic1.jpg";
import pic2 from "/public/images/pic2.jpg";
import pic3 from "/public/images/pic3.jpeg";
import pic4 from "/public/images/pic4.jpg";
import pic5 from "/public/images/pic5.jpg";
import MonthYearSelect from '../components/Select';


function page() {
  const [feedbacks, setFeedbacks] = useState();
  const [userData, setUserData] = useState();
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
    {
      id: 4,
      image: pic4,
      name: "Denis Denison",
    },
    {
      id: 5,
      image: pic5,
      name: "Paul Carter",
    },
  ];


  return (
    <div className="flex flex-col items-between  h-screen">
      <Navbar />
      <div className="  sm:w-[50%] w-[95%]  mx-auto  min-h-[88vh] pt-14">
        {feedbacks ? (
          <div>
               <div className='flex justify-between'>
    <h1 className="font-bold text-xl mt-10 mx-start px-[200px]  text-gray-700">My Feedback</h1> 
    <MonthYearSelect/>

    </div>
      <div className='flex justify-center '>
      
     
        <div className='border w-[300px] h-[400px] border-grey-100'>
        
        <div className='border-b border-grey-100 text-xs font-bold text-slate-500 p-2 text-bold'>FEEDBACK GIVEN</div>
          {data.map((item)=>{
            return(
              <div className="flex items-center  justify-start border-b p-3  hover:bg-sky-100 ">
              <Image
                src={item.image}
                className="rounded-full w-10 h-10 "
                alt={item.name}
              />
              <p className="text-gray-600 ml-3 font-semibold">{item.name}</p>
            </div>

            )
          }
          )}
           
           
          </div>
              
        
            
            <div className='border w-[500px] h-[400px] border-100'>
              
            </div>
      </div>

            </div>
        ) : (
         <div className="border p-5 shadow">
           <h1 className="text-4xl font-bold">No feedback to display 🔮</h1>
            <p className="py-5">
              There is no feedback to display at this time – check back in a
              bit!{" "}
            </p>
          </div>
        )  }

      </div>
      <Footer />
    </div>
  );
}

export default page;
