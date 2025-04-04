'use client';

import React, { useState, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import headerImage from '../../../../public/assets/Logo Icon.png';
import sideImage from '../../../../public/assets/resetPasswrodIllustration.png';
import Image from 'next/image';
import Link from 'next/link';
import '../../../../src/app/globals.css';
import Eye from '../../../../public/assets/Eye.png';
// import EyeClosed from '../../../../public/assets/Property 1=EyeClosed.png';?
import EyeClosed from '../../../../public/assets/hidden.png';
import Toast from '../../../components/auth/Toast'
import axios from 'axios';

import { useSearchParams } from 'next/navigation';


export default function ResetPassword() {

  const searchParams = useSearchParams();
  const userId = searchParams.get('id');

  const [visibility, setVisibility] = useState(true);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isLongEnough: false,
  });
  const [showValidation, setShowValidation] = useState(false);
  const [showConfirm, setShowConfirm]= useState(false);
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
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setShowValidation(true);
      validatePassword(value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.password) {
      toast.error('Password is required');
      return;
    }
    if (!formData.confirmPassword) {
      toast.error('Confirm Password is required');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const { isLongEnough, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar } = passwordValidation;
    if (!isLongEnough || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      toast.error('Please fulfill all password requirements');
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password?id=${userId}`, {
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (response.status === 200) {
        toast.success('Password reset successfully!');
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    }

    // toast.success('Password reset successfully!');
    console.log('Form Data Submitted:', formData);
  };

  return (
    <>
      <Toast />
      <div className="h-screen w-screen flex overflow-y-auto no-scrollbar font-sans">
        <div className="flex-1 p-8 flex flex-col justify-center items-center translate-x-[12px] translate-y-[100px] ">

          {/*Header*/}
          <div className="w-full pt-[59px]">
            <div className="flex items-center justify-center mb-[21px] mr-[27px]">
              <Image src={headerImage} alt="Logo" className="w-[37px] h-auto  -translate-y-[1px] translate-x-[2px]" />
              <span className="text-[22px] font-rosario font-bold text-[#333333] ml-[18px]">
                <span className="font-rosario text-[#333333] font-bold text-[31px]">B</span>lackcofferToDos
              </span>
            </div>
          </div>
          {/**/}
          <div className='translate-y-[64px] -translate-x-[14px]'>
            <h1 className="text-[22px] font-semibold mb-[2px] text-center font-sans text-[#343434]">Create New Password</h1>
            <p className="text-[15px] mb-8 text-gray-700 text-center font-sans">Enter a new password</p>

            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
              <label className="block mb-4 -translate-x-[1px]">
                <span className="text-[#000000] text-[14px] font-regular mb-1">New password</span>
                <div className="relative ">
                  <input
                    type={visibility ? 'password' : 'text'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-[390px] mt-2 block rounded-md border text-[14px] border-gray-300 py-[9px] px-[10px] placeholder-[#B3B3B3]"
                    placeholder="Create new password"
                    aria-label="New Password"
                  />
                  <button
                    type="button"
                    onClick={() => setVisibility(!visibility)}
                    className="absolute right-[11px] top-[10px] text-gray-500 hover:text-gray-700"
                  >
                    <Image src={visibility ? EyeClosed : Eye} alt="Toggle Visibility" className="w-5 h-5" />
                  </button>
                </div>
                {/* <span className="text-sm text-gray-500 mt-1 block">Passwords must be at least 12 characters long.</span> */}
              </label>


              {showValidation && (
                <ul className="mb-4 text-sm">
                  <li className={passwordValidation.isLongEnough ? 'hidden' : 'text-red-600'}>
                    Must contain at least 12 characters
                  </li>
                  <li className={passwordValidation.hasUpperCase ? 'hidden' : 'text-red-600'}>
                    Must contain at least one uppercase letter
                  </li>
                  <li className={passwordValidation.hasLowerCase ? 'hidden' : 'text-red-600'}>
                    Must contain at least one lowercase letter
                  </li>
                  <li className={passwordValidation.hasNumber ? 'hidden' : 'text-red-600'}>
                    Must contain at least one number
                  </li>
                  <li className={passwordValidation.hasSpecialChar ? 'hidden' : 'text-red-600'}>
                    Must contain at least one special character
                  </li>
                </ul>
              )}

              <label className="block mb-4 -translate-x-[1px]">
                <span className="text-[#000000] text-[14px] font-regular mb-1">Confirm password</span>
                <div className="relative ">
                  <input
                    type={visibility ? 'password' : 'text'}
                    name="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-[390px] mt-2 block rounded-md border text-[14px] border-gray-300 py-[9px] px-[10px] placeholder-[#B3B3B3]"
                    placeholder="Re-enter password"
                    aria-label="New Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-[11px] top-[10px] text-gray-500 hover:text-gray-700"
                  >
                    <Image src={showConfirm ? EyeClosed : Eye} alt="Toggle Visibility" className="w-5 h-5" />
                  </button>
                </div>
              </label>

              <button
                type="submit"
                className="w-[390px] bg-[#5D56BD] text-white py-[11px] rounded-md 
                text-[13px] font-normal translate-y-[15px]"
              >
                Confirm
              </button>
            </form>

            <p className=" text-[#000000] text-center text-[13px] font-sans mt-[50px] pb-[222px]">
              Go back to{' '}
              <Link href="/auth/login" className="text-[#5D56BD] underline font-medium">
                Log In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 h-[824px] bg-[#F4F3FF] flex flex-col items-center justify-center pb-[496px] pt-[300px]">
        <div className="">
          <Image
            src={sideImage}
            alt="Illustration"
            className="w-[510px] h-[510px] mt-48 "
            priority={true}
          /></div>
          
        </div>
      </div>
    </>
  );
}
