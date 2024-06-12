"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
import { PASSWORD_REGEXP } from "./constants";
import { useRouter } from "next/navigation";
import { Circles } from "react-loader-spinner";
import { useState } from "react";
import { FaFire } from "react-icons/fa";
import logo from "../../public/images/feed.png";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const [errors, setErrors] = useState();
  const { data: session } = useSession();

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

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: defaultFormValues,
  });

  const onSubmit = async (values) => {
    router.push("/home");

    // try {
    //   const response = await loginUser(values);
    //   if (response?.data?.token) {
    //     router.push("/home");
    //     return;
    //   }
    //   reset(values);
    // } catch (error) {
    //   if (error?.code === "ERR_NETWORK") {
    //     setErrors(error?.message);
    //     return;
    //   }
    //   console.log(error);
    //   setErrors(error?.response?.data?.error);
    // }
  };

  if (session) {
    router.push("/home");
    return;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 shadow-lg">
      <div className="border-2 border-green-700 p-5 rounded shadow-lg">
        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-center gap-y-6 items-center"
        >
          <div>
            {/* <h1 className="text-gray-500 mb-1">Feedback</h1> */}
            <Image src={logo} width={150} className="" />
            {errors && (
              <div className="flex items-center justify-center gap-2 bg-red-500 text-xs p-1 text-red-100 border-4 border-red-200 rounded">
                <FaFire size={20} />
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
          {/* <button
            onClick={() => signIn("github")}
            type="button"
            // disabled={formState.isSubmitting}
            className="bg-green-700 px-5 py-1 text-gray-200 rounded active:bg-green-900"
          >
         
            Sign in with github
          </button>
          <button
            onClick={() => signIn("google")}
            type="button"
            // disabled={formState.isSubmitting}
            className="bg-green-700 px-5 py-1 text-gray-200 rounded active:bg-green-900"
          >
         
            Sign in with google
          </button> */}

          <button type="button" onClick={()=>signIn("github")} className="inline-flex hover:bg-gray-100 h-10  items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
              className="h-[18px] w-[18px] "
            />
            Log in with GitHub
          </button>

          <button type="button" onClick={()=>signIn("google")} className="hover:bg-gray-100 inline-flex h-10  items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-[18px] w-[18px] "
            />
            Log in with Google
          </button>
        </form>
      </div>
    </div>
  );
}
