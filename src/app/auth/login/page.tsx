"use client";

import React, { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Eye from "../../../../public/assets/Eye.png";
import google from "../../../../public/assets/google.png";
import image1 from "../../../../public/assets/Accept tasks-amico 1.png";
import Link from "next/link";
import "../../../../src/app/globals.css";
import { toast } from "react-toastify";
import Toast from "../../../components/auth/Toast";
import headerImage from "../../../../public/assets/Logo Icon.png";
import { authService } from "../../../lib/api/services";
import hidden from '../../../../public/assets/hidden.png';
import axios from "axios";
import { Rosario } from "next/font/google";
import { useGoogleLogin } from '@react-oauth/google';

const rosario = Rosario({ subsets: ["latin"], weight: ["400", "700"] });

export default function LoginPage() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      data.email
    );
    if (!validEmail) {
      toast.error("Enter a valid email");
      return;
    }
    if (!data.email) {
      toast.error("Email is required");
      return;
    }
    if (!data.password) {
      toast.error("Password is required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      toast.success("Logged in successfully! Redirecting...");

      setTimeout(() => {
        router.push("/main/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (tokenResponse: any) => {
    try {
      const { access_token } = tokenResponse;

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`,
        { access_token }
      );

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        toast.success("Logged in successfully! Redirecting...");

        setTimeout(() => {
          router.push("/main/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("Error during Google Login:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => {
      console.log("Google login failed");
      toast.error("Login failed. Please try again.");
    },
    flow: 'implicit'
  });

  return (
    <>
      <Toast />
      <div className="h-screen w-screen flex overflow-y-auto no-scrollbar">
        {/* Left Section */}
        <div className="w-1/2 h-full bg-white flex items-center justify-center font-sans no-scrollbar">
          <div className="w-full max-w-md py-8 pl-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-center mb-[21px] mt-[26px] mr-[37px]">
              <Image src={headerImage} alt="Logo" className="w-[37px] h-auto -translate-x-[4px] -translate-y-[1px]" />
              <span className="text-[22px] font-rosario font-bold text-[#333333] ml-[11px]">
                <span className="font-rosario text-[#333333] font-bold text-[31px]">B</span>lackcofferToDos
              </span>
            </div>

            {/* Title */}
            <div className="text-center mb-6 flex-grow flex flex-col justify-end space-y-0 mt-[35px] -translate-x-[20px]">
              <h1 className="text-[22px] font-semibold font-sans text-[#343434]">
                Login to{" "}
                <span className="text-[#5D56BD] italic font-sans font-md">BlackcofferToDos</span>
              </h1>
              <p className="text-regular text-[#333333] mt-1 text-[15px]">Welcome Back</p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex-grow flex flex-col space-y-3 -translate-x-3 pb-[170px]"
            >
              <div className="flex flex-col w-full pt-[15px] ">
                <label className="text-[#000000] text-[14px] font-regular mb-1">Email-Id</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-[388px] ml-[2px] pl-[8px] pr-20 pt-[11px] pb-[9px]  border-[1px]
                   border-[#000000]/10 placeholder-[#B3B3B3]  font-regular 
                   rounded-lg text-[14px] text-[#333333]"
                  placeholder="Enter email-Id"
                />
              </div>

              <div>
                <label className="text-[#000000] text-[14px] font-regular mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    className="w-[388px] ml-[2px] pl-[8px] pr-20 pt-[11px] pb-[12px]  border-[1px] border-[#000000]/10 placeholder-[#B3B3B3]  font-regular rounded-lg text-[14px] text-[#333333]"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute w-[22px] -translate-x-[37px] top-1/2 -translate-y-1/2"
                  >
                    <Image
                      src={passwordVisible ? Eye : hidden}
                      alt={passwordVisible ? "Hide password" : "Show password"}
                      className="w-[60px] h-auto"
                    />
                  </button>
                </div>
              </div>

              <div className="text-right -translate-x-[16px] -translate-y-2">
                <Link
                  href="/auth/forgot-password"
                  className="text-[14px] text-[#5D56bd] font-normal"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="flex-grow">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-[388px] py-[12px] text-[13px] bg-[#5D56BD] text-white rounded-lg  transition-colors mt-[8px]"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>

                <div className="relative py-2 mt-8 -translate-y-[13px]">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-[388px] border-t-[1px] border-[#000000]/20"></div>
                  </div>
                  <div className="relative flex justify-center -translate-x-2">
                    <span className="bg-white  text-gray-500 text-[13px] px-[6px]">
                      Or
                    </span>
                  </div>
                </div>
              </div>

              {/* Google Login Button */}
              {/* <div className="border-[#565DBD] border-1 rounded-lg -translate-y-2 font-sans">
                <button
                  type="button"
                  onClick={() => login()}
                  className="w-[388px] flex items-center justify-center px-2.5 py-2 border border-[#5D56BD] rounded-lg hover:bg-gray-100 transition-all duration-300"
                >
                  <Image
                    src={google}
                    alt="Google"
                    width={22}
                    height={22}
                    className="mr-2"
                  />
                  <span className="text-[13.5px] text-[#5D55BD] font-medium pl-[4px] pt-[4px]">
                    Continue with Google
                  </span>
                </button>
              </div> */}
              <button
                type="button"
                onClick={() => login()}
                className="w-[388px] flex items-center justify-center pt-3 pb-2.5 border-[1.5px] border-[#565dBD] rounded-lg hover:bg-gray-50 font-medium mt-[9px]"
              >
                <Image
                  src={google}
                  alt="Google"
                  width={26}
                  height={26}
                  className="mr-7"
                />
                <span className="text-[13.5px] text-[#565dbd] -translate-x-3">
                  Continue with Google
                </span>
              </button>

              <div className="text-center text-[15px] mt-[15px] mb-10">
                <p className="text-[#000000] font-light mt-[9px] mr-[12px]">
                  Don't have an account?{" "}
                  <Link
                    href="/auth/signup"
                    className="text-[#565DBD] underline font-medium "
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 h-[824px] bg-[#F4F3FF] flex items-center justify-center pb-[496px] pt-[300px]">
          <div className="">
            <Image
              src={image1}
              alt="Illustration"
              className="w-[535px] h-[520px] mt-52 "
              priority={true}
            /></div>

        </div>
      </div>
    </>
  );
}