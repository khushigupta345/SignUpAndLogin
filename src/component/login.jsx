import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import image from "../assets/image.png";

const schema = Yup.object({
  email: Yup.string()
  .required("Email is required")
  .matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    "Enter a valid email address"
  ),
  

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  remember: Yup.boolean().default(true),
}).required();

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "", remember: true },
    mode: "onSubmit",
  });

  const onSubmit = (values) => {
    alert("Login successful!");
    console.log(values);
    reset();
  };

  return (
    <div className="overflow-x-hidden bg-white relative font-serif flex items-center justify-center">
      <div className="max-h-screen">
        <div className="mx-auto px-2 py-8 md:py-2.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-3 items-start">
            <section className="pl-2 w-full max-w-[400px] sm:max-w-sm md:max-w-md lg:max-w-lg max-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-13 w-13 rounded-lg bg-[#5336F2] text-white flex items-center justify-center font-semibold">
                  B
                </div>
                <span className="text-gray-900 text-lg font-semibold">BlackCoat Ai</span>
              </div>

              <div className="flex flex-col items-center mb-3">
                <div className="w-14 h-14 grid place-items-center max-auto rounded-xl border border-gray-200 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black flex justify-center"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 
                        0112 15c2.485 0 4.797.732 
                        6.879 2.002M15 10a3 3 0 
                        11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-xl text-center font-semibold text-gray-900 mb-1">
                Login to your account
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-center text-gray-400 mb-8">
                Welcome back, please enter your details
              </p>

              {serverError && (
                <div
                  role="alert"
                  className="mb-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-[3px] px-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 ">
                    Email address*
                  </label>
                  <div
                    className={`relative flex items-center rounded-xl border bg-white ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } focus-within:ring-2 focus-within:ring-indigo-500`}
                  >
                    <Mail className="absolute left-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@email.com"
                      className="peer w-full rounded-xl border-0 pl-9 pr-3 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                      {...register("email")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password*
                  </label>
                  <div
                    className={`relative flex items-center rounded-xl border bg-white ${
                      errors.password ? "border-red-300" : "border-gray-300"
                    } focus-within:ring-2 focus-within:ring-indigo-500`}
                  >
                    <Lock className="absolute left-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className="peer w-full rounded-xl border-0 pl-9 pr-10 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                      placeholder="•••••••••"
                      {...register("password")}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "password-error" : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 p-1 text-gray-500 hover:text-gray-700"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p id="password-error" className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700 select-none">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      defaultChecked
                      {...register("remember")}
                    />
                    <span>Keep me Logged in</span>
                  </label>

                  <a
                    href="#"
                    className="text-sm text-gray-500 hover:text-gray-700 underline-offset-2 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center rounded-xl bg-[#5336F2] px-4 py-3 text-white font-medium shadow-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5336F2]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in…
                    </>
                  ) : (
                    "Log in"
                  )}
                </button>

                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-sm text-gray-500">OR</span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => alert("Google login")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611 20.083H42V20H24v8h11.303C33.676 32.659 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.869 6.053 29.729 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.65-.389-3.917z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.306 14.691l6.571 4.819C14.207 16.108 18.737 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.869 6.053 29.729 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.191-5.238C29.145 35.091 26.715 36 24 36c-5.202 0-9.642-3.317-11.291-7.946l-6.53 5.027C9.474 39.556 16.227 44 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611 20.083H42V20H24v8h11.303a12.02 12.02 0 0 1-4.303 5.946l.003-.002 6.191 5.238C36.838 40.049 44 35 44 24c0-1.341-.138-2.65-.389-3.917z"
                    />
                  </svg>
                  Log in with Google
                </button>

                <p className="text-center text-sm text-gray-600">
                  Not registered yet?{" "}
                  <a
                    href="#"
                    className="font-medium text-gray-800 underline-offset-2 hover:underline"
                  >
                    Create an account
                  </a>
                </p>
              </form>
            </section>

            <aside className="w-full md:flex-1 flex items-center justify-center">
              <div className="w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl bg-gray-100 p-4 md:p-6 shadow-inner">
                <div className="rounded-2xl overflow-hidden ">
                  <img
                    src={image}
                    alt="Workspace preview"
                    className="w-full h-48 sm:h-60 md:h-72 lg:h-80 object-contain rounded-xl"
                    draggable={false}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Search all your data in one place
                  </h3>
                  <p className="text-gray-500 text-sm max-w-[520px] mx-auto">
                    lorem ipsum, the page creator placed that apparent
                  </p>
                  <p className="text-gray-500 text-sm max-w-[520px] mx-auto">
                    gibberish there on purpose.
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <span className="inline-block h-2 w-10 bg-[#5B61FF] rounded-full" />
                    <span className="inline-block h-2 w-2 bg-gray-400 rounded-full" />
                    <span className="inline-block h-2 w-2 bg-gray-400 rounded-full" />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}