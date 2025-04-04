'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../../src/app/globals.css'

import headerImage from '../../../../public/assets/Logo Icon.png';
import sideImage from '../../../../public/assets/forgotPassword.png';

export default function ForgotPassword() {
  const [mail, setMail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted'); 

    // Validate email
    if (!mail) {
      toast.error('Email is required');
      return;
    }

    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);
    if (!validEmail) {
      toast.error('Enter a valid email');
      return;
    }

    console.log(mail)
    setShowModal(true);
  };

  const Modal = () => {
    if (!showModal) return null;

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setShowModal(false)}
      >
        <div 
          className="bg-white p-8 rounded-lg max-w-sm w-full m-4"
          onClick={e => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4">Password Reset Email Sent</h2>
          <p className="mb-6">Check your email for instructions to reset your password.</p>
          <button
            className="w-full bg-[#565DBD] text-white py-2 rounded-lg"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Toast Container */}
      <ToastContainer position="top-center"/>

      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center font-sans">
        <div className="w-full max-w-md py-8 pl-10 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center mb-4 mt-[70px] -translate-x-[12px]">
              <Image src={headerImage} alt="Logo" className="w-10 h-auto -translate-x-2" />
              <span className="text-[22.5px] font-rosario font-bold text-[#333333] ml-2">
                <span className="font-rosario text-[#333333] font-bold text-[31px]">B</span>lackcofferToDos
              </span>
            </div>

          {/* Form */}
          <div className="text-center mb-9 mt-[80px] -translate-x-4">
            <h1 className="text-[22px] font-semibold mb-[2px] text-[#343434]">Forgot Password</h1>
            <p className="text-[#333333] text-[15px]">Don't worry . We have your back</p>
          </div>

            <div className='text-[#4D4D4D] font-normal text-[13px] -translate-x-[6px]'> Enter your registered email address for instructions to <p>reset your password.</p></div>
          <form onSubmit={handleSubmit} className="space-y-6 font-sans">
            <div className='mt-4 -translate-x-2'>
              <label className="block text-[13px]  text-[#000000] mb-1">
                Email-Id
              </label>
              <input
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className="w-[390px] px-[12px] py-[10px] border-[1.5px] rounded-md  placeholder-[#B3B3B3] text-[#000000] 
                text-sm"
                placeholder="Enter your registered email-id"
                required
              />
            </div>

            <button
              type="submit"
              className="w-[390px] text-[13.5px] bg-[#5D56BD] text-white py-[11px] transition duration-200 rounded-lg -translate-x-[9px] mt-10  translate-y-1"
            >
              Send 
            </button>
          </form>

          <p className="mt-6 text-center text-[#000000] font-light text-[13.5px] -translate-x-4 translate-y-3 mb-[220px]"> Go back to {" "} 
            <Link href="/auth/login" className="text-[#5D56BD] font-medium underline hover:text-indigo-600">
              Log In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex flex-1 bg-[#F4F3FF] items-center justify-center">
        <Image
          src={sideImage}
          alt="Forgot Password Illustration"
          className="w-[530px] h-auto pl-4"
          priority
        />
      </div>
      <Modal />
    </div>
  );
}
