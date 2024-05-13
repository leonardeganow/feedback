"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";

export default function Home() {
  const defaultFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: defaultFormValues,
  });

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 shadow-lg">
      <div className="border-2 border-green-700 p-5 rounded shadow-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-center gap-y-8 items-center"
        >
          <h1 className="text-gray-500">Feedback</h1>
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
          <input
            type="password"
            className={clsx({
              "outline-none p-3 border": true,
              "border-green-500 border-2":
                formState.dirtyFields?.password &&
                !!!formState.errors?.password === true,
              "border-red-500 border-2": !!formState.errors?.password === true,
            })}            placeholder="*******"
            {...register("password")}
          />
          <button
            type="submit"
            className="bg-green-700 px-5 py-1 text-gray-200 rounded active:bg-green-900"
          >
            log in
          </button>
        </form>
      </div>
    </div>
  );
}
