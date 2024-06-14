"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
import { PASSWORD_REGEXP } from "./constants";
import { useRouter } from "next/navigation";
import { Circles } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";
import logo from "../../public/images/feed.png";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const [errors, setErrors] = useState();
  const { data: session } = useSession();

  const Router = useRouter();
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

  const { register, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (session) {
      Router.push("/home");
    }
  }, [session, Router]);

  if (session) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="border-2 border-green-700 p-5 rounded shadow-lg w-[300px]"
      >
        <div className="flex justify-center">
          {/* <h1 className="text-gray-500 mb-1">Feedback</h1> */}
          <Image src={logo} width={150} className="" />
          {errors && (
            <div className="flex items-center justify-center gap-2 bg-red-500 text-xs p-1 text-red-100 border-4 border-red-200 rounded">
              <FaFire size={20} />
              {errors}
            </div>
          )}
        </div>
        <div className="mb-6">
          <input
            type="text"
            className={clsx({
              "outline-none p-3 border  w-full rounded": true,
              "border-green-500 border-2":
                formState.dirtyFields?.email &&
                !!!formState.errors?.email === true,
              "border-red-500 border-2": !!formState.errors?.email === true,
            })}
            placeholder="enter your email"
            {...register("email")}
          />
          {formState.errors.email && (
            <p className="text-red-500 text-left text-xs ">
              {formState.errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-2">
          <input
            type="password"
            className={clsx({
              "outline-none p-3 border  w-full rounded": true,
              "border-green-500 border-2":
                formState.dirtyFields?.password &&
                !!!formState.errors?.password === true,
              "border-red-500 border-2": !!formState.errors?.password === true,
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

        <div className="flex flex-col items-center gap-y-3">
          <Link className="m-0 underline text-blue-500" href="/addusers">
            add user?
          </Link>

          <button
            type="button"
            onClick={() => signIn("github")}
            className="flex hover:bg-gray-100 h-10  items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
              className="h-[18px] w-[18px] "
            />
            Log in with GitHub
          </button>

          <button
            type="button"
            onClick={() => signIn("google")}
            className="hover:bg-gray-100 flex h-10  items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-[18px] w-[18px] "
            />
            Log in with Google
          </button>
        </div>
      </form>
    </div>
  );
}
