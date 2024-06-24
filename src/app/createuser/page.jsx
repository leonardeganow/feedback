"use client";
import axios from "axios";
import React, { useState } from "react";
import { convertImageToBase64 } from "../utils";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/feed.png";
import { Oval } from "react-loader-spinner";
import { toast } from "sonner";
function Page() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [image, setImage] = useState(null);

  const handleNameChange = (e) => setFullName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const base64Image = await convertImageToBase64(image);
    const formData = {
      fullName: fullName,
      email: email,
      password,
      image: base64Image,
    };
    try {
      const response = await axios.post("/api/createuser", formData, {
        headers: {
          // "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        toast.success(response.data.message);
        setLoading(false);
        setError("");
        setFullName("");
        setPassword("");
        setEmail("");
        setImage(null);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data);

      setError(error.response.data);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100dvh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className=" p-5 rounded-[12px] shadow-xl w-[350px] bg-white"
      >
        <div className="flex justify-center  mb-2">
          {/* <h1 className="text-gray-500 mb-1">Feedback</h1> */}
          <Image src={logo} width={110} className="" />
        </div>

        <p className="font-semibold text-sm text-center text-gray-500 mb-4">
          Please enter details to create user
        </p>
        {/* {message && (
          <div className={`text-green-500 text-center`}>{message}</div>
        )}
        {error && <div className={`text-red-500 text-center`}>{error}</div>} */}

        <div className="mb-4">
          <label htmlFor="" className="font-semibold text-sm text-gray-600 ">
            Full name
          </label>
          <input
            type="text"
            id="fullName"
            disabled={loading}
            value={fullName}
            onChange={handleNameChange}
            className="outline-none p-3 border  w-full rounded-xl mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="" className="font-semibold text-sm text-gray-600 ">
            Email
          </label>
          <input
            type="text"
            id="email"
            disabled={loading}
            value={email}
            onChange={handleEmailChange}
            className="outline-none p-3 border  w-full rounded-xl mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="" className="font-semibold text-sm text-gray-600 ">
            password
          </label>
          <input
            type="text"
            id="password"
            disabled={loading}
            value={password}
            onChange={handlePasswordChange}
            className="outline-none p-3 border  w-full rounded-xl mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="font-semibold text-sm text-gray-600 "
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            disabled={loading}
            onChange={handleImageChange}
            className="outline-none p-3 border  w-full rounded-xl mt-1"
            accept="image/*"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex justify-center mb-4 bg-gradient-to-b from-slate-500 to-black text-white w-full p-2 rounded-xl "
        >
          {loading ? (
            <div className="flex gap-x-2 justify-center items-center ">
              <Oval
                visible={true}
                width="25"
                height="30"
                color="white"
                ariaLabel="infinity-spin-loading"
              />
              processing
            </div>
          ) : (
            "Submit"
          )}
        </button>

        <div className="flex justify-center gap-1 text-xs font-semibold text-gray-400">
          Go back to
          <Link className="m-0  text-gray-800" href="/">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Page;
