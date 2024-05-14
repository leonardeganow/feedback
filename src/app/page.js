"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
import { PASSWORD_REGEXP } from "./constants";
import { loginUser } from "./api/AuthApi";
import { useRouter } from "next/navigation";
import { Circles } from "react-loader-spinner";
import { useState } from "react";
import { FaFire } from "react-icons/fa";
import logo from "../../public/images/feed.png"
import Image from "next/image";

export default function Home() {
  const [errors, setErrors] = useState();
  const router = useRouter();
  const defaultFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(PASSWORD_REGEXP, "Wrong password format"),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: defaultFormValues,
  });

  const onSubmit = async (values) => {
    try {
      const response = await loginUser(values);
      if (response?.data?.token) {
        router.push("/home");
        return;
      }
      reset(values);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 shadow-lg">
      <div className="border-2 border-green-700 p-5 rounded shadow-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-center gap-y-6 items-center"
        >
          <div>

          {/* <h1 className="text-gray-500 mb-1">Feedback</h1> */}
          <Image src={logo} width={150}  className=""/>
          {errors && (
            <div className="flex items-center gap-2 bg-red-500 text-xs p-1 text-red-100 border-4 border-red-200 rounded">
              <FaFire size={20}/>
              {errors}
            </div>
          )}
          </div>
          <div>
            <input
              type="text"
              className={clsx({
                "outline-none p-3 border": true,
                "border-green-500 border-2":
                  formState.dirtyFields?.email &&
                  !!!formState.errors?.email === true,
                "border-red-500 border-2": !!formState.errors?.email === true,
              })}
              placeholder="enter your email"
              {...register("email")}
            />
            {formState.errors.email && (
              <p className="text-red-500 text-left text-xs py-1 ">
                {formState.errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              className={clsx({
                "outline-none p-3 border": true,
                "border-green-500 border-2":
                  formState.dirtyFields?.password &&
                  !!!formState.errors?.password === true,
                "border-red-500 border-2":
                  !!formState.errors?.password === true,
              })}
              placeholder="*******"
              {...register("password")}
            />
            {formState.errors.password && (
              <p className="text-red-500 text-left text-xs py-1 ">
                {formState.errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="bg-green-700 px-5 py-1 text-gray-200 rounded active:bg-green-900"
          >
            {formState.isSubmitting ? (
              <Circles
                height="20"
                width="20"
                color="white"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "log in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
