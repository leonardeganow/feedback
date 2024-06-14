"use client";
import axios from "axios";
import React, { useState } from "react";
import { convertImageToBase64 } from "../utils";
import Link from "next/link";

function Page() {
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [image, setImage] = useState(null);

  const handleNameChange = (e) => setFullName(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const base64Image = await convertImageToBase64(image);
    const formData = {
      fullName: fullName,
      image: base64Image,
    };
    try {
      const response = await axios.post("/api/adduser", formData, {
        headers: {
          // "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        setMessage(response.data.message);
        setLoading(false);
        setError("");
        setFullName("");
        setImage(null);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-green-700 p-5 rounded shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add new employee
        </h2>
        {message && (
          <div className={`text-green-500 text-center`}>{message}</div>
        )}
        {error && <div className={`text-red-500 text-center`}>{error}</div>}

        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            disabled={loading}
            value={fullName}
            onChange={handleNameChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div className="">
          <label
            htmlFor="image"
            className="block text-gray-700 font-semibold mb-2"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            disabled={loading}
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            accept="image/*"
            required
          />
        </div>
        <Link
          href="/"
          className=" flex justify-center py-4 underline cursor-pointer text-blue-500"
        >
          back to login
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white font-semibold p-2 rounded-lg hover:bg-indigo-600 transition duration-200"
        >
          {loading ? "...loading" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Page;
