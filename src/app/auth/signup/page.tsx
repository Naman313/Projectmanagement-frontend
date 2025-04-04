"use client";

import React, { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import Eye from "../../../../public/assets/Eye.png";

import google from "../../../../public/assets/google.png";
import image1 from "../../../../public/assets/Accept tasks-amico 1.png";
import Link from "next/link";
import "../../../../src/app/globals.css";
import { toast } from "react-toastify";
import Toast from "../../../components/auth/Toast";
import headerImage from "../../../../public/assets/Logo Icon.png";
import { authService } from "../../../lib/api/services";
import { GoogleLogin } from "@react-oauth/google";
import hidden from '../../../../public/assets/hidden.png'
import GoogleSignIn from "@/customHooks/useGoogleSignup";
interface SignUpFormData {
  name: string;
  email: string;
  organisation: string;
  password: string;
}

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    organisation: "",
    password: "",
  });


  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isLongEnough: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validatePassword = (password: string) => {
    setPasswordValidation({
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      isLongEnough: password.length >= 12,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
      setVisibility(true)
    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email) {
      toast.error("Email is required");
      return;
    }
    if (!formData.organisation) {
      toast.error("Organisation name is required");
      return;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return;
    }

    const {
      isLongEnough,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
    } = passwordValidation;
    if (
      !isLongEnough ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      toast.error("Please ensure your password meets all requirements");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.signup({
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        organization: formData.organisation,
      });

      if (response && response.status === 201) {
        localStorage.setItem("token", response.data.token);
        toast.success("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error("An account with this email already exists");
        } else {
          toast.error("An error occurred during signup");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <>
      <Toast />
      <div className="h-screen w-screen flex overflow-y-auto no-scrollbar font-sans ">
        {/* Left Section */}
        <div className="w-1/2 h-[824px] bg-white flex items-center justify-center overflow-y-auto font-sans no-scrollbar">
          <div className="w-full  px-6 py-8 flex flex-col h-full scale-[0.9] origin-top-left">
            {/* Header */}
            <div className="flex items-center justify-center mb-[21px] mt-[10px] ml-[80px]">
              <Image src={headerImage} alt="Logo" className="w-[42px] h-auto -translate-y-1 translate-x-[0px]" />
              <span className="text-[25px] font-rosario font-bold text-[#333333] ml-[25px] -translate-y-[4px] -translate-x-2">
                <span className="font-rosario text-[#333333] font-bold text-[32px]">B</span>lackcofferToDos
              </span>
            </div>

            {/* Title */}
            <div className="text-center mb-4 w-full ml-7 -translate-y-3 translate-x-2">
              <h1 className="text-[25px] font-semibold font-sans mt-7  flex-grow whitespace-nowrap">
                Try <span className="text-[#5D56BD] italic font-sans font-md">BlackcofferToDos</span>{" "}
                for free
              </h1>
              <p className="font-regular text-[#333333]  text-[16.5px] ">
                No credit card required . Cancel anytime
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex-grow flex flex-col space-y-4 mt-2 ml-[115px]"
            >
              <div className="flex flex-col w-full pt-[6px]">
                <label className="text-[#000000] text-[15px] font-regular mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  // focus:outline-none focus:ring-0
                  className=" w-[430px] pl-[12px] pr-20 pt-[12px] pb-[11px] border border-[#B3B3B3]
                   border-[#000000]/10 placeholder-[#B3B3B3]
                   text-[#000000] rounded-lg text-[15.5px]"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-[#000000] text-[15px] font-regular mb-1">Email-Id</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-[430px] pl-[12px] pr-20 pt-[12px] pb-[11px] border border-[#B3B3B3]
                   border-[#000000]/10 placeholder-[#B3B3B3]
                   text-[#000000] rounded-lg text-[15.5px]"
                  placeholder="Enter your email-id"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-[#000000] text-[15px] font-regular mb-1">
                  Organization's name
                </label>

                <input
                  type="text"
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleChange}
                  className="w-[430px] pl-[12px] pr-20 pt-[12px] pb-[11px] border border-[#B3B3B3]
                   border-[#000000]/10 placeholder-[#B3B3B3]
                   text-[#000000] rounded-lg text-[15.5px]"
                  placeholder="Enter your organization's name"
                />
              </div>
                <div>
                <div className="relative flex flex-col w-full">
                   <label className="text-[#000000] text-[15px] font-regular mb-1">
                  Create password
                </label>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-[430px] pl-[12px] pr-20 pt-[12px] pb-[11px] border border-[#B3B3B3]
                   border-[#000000]/10 placeholder-[#B3B3B3]
                   text-[#000000] rounded-lg text-[15.5px] mt-2"
                    placeholder="Create new password"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute w-[22px] -translate-x-[37px] top-1/2 -translate-y-1/2"
                  >
                    <Image
                      src={passwordVisible ? Eye : hidden}
                      alt={passwordVisible ? "Hide password" : "Show password"}
                      className="w-[65px] h-auto translate-x-[430px] translate-y-[19px]"
                    />
                  </button>
                </div>
            

                {/* Password Requirements */}
                {visibility && (
                  <ul className="space-y-0.5 text-xs">
                    <li
                      className={
                        passwordValidation.isLongEnough
                          ? "hidden"
                          : "text-red-600"
                      }
                    >
                      Must contain 12 letters
                    </li>
                    <li
                      className={
                        passwordValidation.hasUpperCase
                          ? "hidden"
                          : "text-red-600"
                      }
                    >
                      Must contain one Upper case
                    </li>
                    <li
                      className={
                        passwordValidation.hasLowerCase
                          ? "hidden"
                          : "text-red-600"
                      }
                    >
                      Must contain one Lower case
                    </li>
                    <li
                      className={
                        passwordValidation.hasNumber
                          ? "hidden"
                          : "text-red-600"
                      }
                    >
                      Must contain one Number
                    </li>
                    <li
                      className={
                        passwordValidation.hasSpecialChar
                          ? "hidden"
                          : "text-red-600"
                      }
                    >
                      Must contain one Special Character
                    </li>
                  </ul>
                )}
              </div>

              <div className="flex-grow flex flex-col justify-end space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-[430px] bg-[#5D56BD] text-white py-[12px] rounded-lg
                text-[15px] font-normal translate-y-[15px]"
                >
                  {isLoading ? "Creating account..." : "Create your account"}
                </button>

                <div className="relative pt-[35px]">
                  <div className=" inset-0 flex items-center">
                    <div className="w-[430px] border-t-[1.5px] border-gray-200 translate-y-3"></div>

                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-[11px] text-[15px] font-light text-[#4D4D4D] -translate-x-5">
                      Or
                    </span>
                  </div>
                </div>
                <GoogleSignIn/>


                <div className="text-center pt-5 text-[#000000] font-light text-md font-sans pb-3 text-[15px] -translate-x-[22px]">
                  <p>
                    Questions? Need a help?{" "}
                    <a
                      href="#"
                      className="text-[#565DBD] underline  font-medium"
                    >
                      Support can help.
                    </a>
                  </p>
                  <div className="mt-2">
                    Already have an account?{" "}
                    <Link
                      href="/auth/login"
                      className="text-[#565DBD] underline font-medium"
                    >
                      Log In
                    </Link>
                  </div>
                  <div className="mt-[25px]"></div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 h-[824px] bg-[#F4F3FF] flex items-center justify-center pt-[6px] ">
          <Image
            src={image1}
            alt="Illustration"
            className="w-[544px] h-auto "
            priority={true}
          />
        </div>
      </div>
    </>
  );
}
