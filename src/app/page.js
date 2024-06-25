"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
import { PASSWORD_REGEXP } from "./constants";
import { useRouter } from "next/navigation";
import { Circles, Oval } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";
import logo from "../../public/images/feed.png";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

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

  const { register, formState, handleSubmit } = useForm({
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

  const onSubmit = async (values) => {
    try {
      const { email, password } = values;
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!response.error) {
        Router.push("/home");
      } else {
        // handle error
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="flex justify-center items-center h-[100dvh] bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-5 rounded-[12px] shadow-xl w-[350px] bg-white"
      >
        <div className="flex justify-center  mb-2">
          {/* <h1 className="text-gray-500 mb-1">Feedback</h1> */}
          <Image src={logo} width={110} className="" />
        </div>
        <p className="text-center font-bold text-xl mb-2">Welcome Back</p>
        <p className="font-semibold text-sm text-center text-gray-500 mb-4">
          Please enter your details to continue
        </p>
        <div className="flex justify-center mb-6 gap-x-5">
          <button
            type="button"
            onClick={() => signIn("github")}
            className="border border-gray-100 shadow rounded-xl hover:bg-gray-50  py-2 px-8 cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
              className="h-[18px] w-[18px] "
            />
          </button>
          <button
            type="button"
            onClick={() => signIn("google")}
            className="border border-gray-100 shadow rounded-xl hover:bg-gray-50  py-2 px-8 cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-[18px] w-[18px] "
            />
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="" className="font-semibold text-sm text-gray-600 ">
            Email
          </label>
          <input
            type="text"
            className={clsx({
              "outline-none p-3 border  w-full rounded-xl mt-1": true,
              "border-green-500 border-2":
                formState.dirtyFields?.email &&
                !!!formState.errors?.email === true,
              "border-red-500 border-2": !!formState.errors?.email === true,
            })}
            placeholder="johndoe@gmail.com"
            {...register("email")}
          />
          {formState.errors.email && (
            <p className="text-red-500 text-left text-xs ">
              {formState.errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="" className="font-semibold text-sm text-gray-600 ">
            Password
          </label>

          <input
            type="password"
            className={clsx({
              "outline-none p-3 border  w-full rounded-xl mt-1": true,
              "border-green-500 border-2":
                formState.dirtyFields?.password &&
                !!!formState.errors?.password === true,
              "border-red-500 border-2": !!formState.errors?.password === true,
            })}
            placeholder="Enter your password"
            {...register("password")}
          />
          {formState.errors.password && (
            <p className="text-red-500 text-left text-xs py-1 ">
              {formState.errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-2">
          <button className="bg-gradient-to-b from-slate-500 to-black text-white w-full p-2 rounded-xl ">
            {formState.isSubmitting ? (
              <div className="flex justify-center items-center">
                <Oval
                  visible={true}
                  width="25"
                  height="30"
                  color="white"
                  ariaLabel="infinity-spin-loading"
                />
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>

        <div className="flex justify-center gap-1 text-xs font-semibold text-gray-400">
          need to add an employee?
          <Link className="m-0  text-gray-800" href="/addusers">
            Click here
          </Link>
        </div>
        <div className="flex justify-center gap-1 text-xs font-semibold text-gray-400">
          <Link className="m-0  text-gray-800" href="/createuser">
            Add user
          </Link>
        </div>
      </form>
    </div>
  );
}
