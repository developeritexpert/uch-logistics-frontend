'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="flex flex-col items-center justify-center relative z-[2] p-[20px] md:p-[30px]">
      <div className='mb-[30px] md:mb-[50px]'>
        <Image
          src="/img/logo.png"
          alt="Logo"
          width={300}
          height={300}
          className="w-[150px] md:w-[200px] 2xl:w-[308px]"
        />
      </div>
      <div className="w-full max-w-[600px] 2xl:min-w-[721px]">
        <div className="bg-white rounded-[25px] shadow-[0px_64px_94px_0px_#2235810D] p-[30px] md:p-[50px]">
          <div className="text-center mb-8">
            <h1 className="text-[25px] md:text-[30px] 2xl:text-[42px] font-black text-primary leading-[1.2]">
              Welcome Back, Admin!
            </h1>
            <p className="text-[#515151] text-sm 2xl:text-[18px] mt-[10px]">
              Your command center for real-time logistics control starts here.
            </p>
          </div>
          <form>
            <div className="mb-6">
              <input
                type="email"
                className="w-full 2xl:py-[25px] px-4 py-3 border border-[#22358114] rounded-[7px] focus:outline-0 focus:border-[#515151] duration-300 2xl:text-[18px] text-sm placeholder:text-[#515151] placeholder:font-light"
                placeholder="Enter Your Email"
              />
            </div>

            <div className="mb-[20px] relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full 2xl:py-[25px] px-4 py-3 border border-[#22358114] rounded-[7px] focus:outline-0 focus:border-[#515151] duration-300 2xl:text-[18px] text-sm placeholder:text-[#515151] placeholder:font-light pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-[15px] 2xl:w-[20px]" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5C5.63636 5 1 12 1 12C1 12 5.63636 19 12 19C18.3636 19 23 12 23 12C23 12 18.3636 5 12 5Z" stroke="#515151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#515151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg className="w-[15px] 2xl:w-[20px]" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5.63636 20 1 12 1 12C2.015 9.747 3.558 7.607 5.06 6.06M9.9 4.24C10.5883 4.07888 11.2931 3.99834 12 4C18.3636 4 23 12 23 12C22.393 13.136 21.669 14.23 20.87 15.17M14.12 14.12C13.8454 14.4147 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88" stroke="#515151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 1L23 23" stroke="#515151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>

            <div className="mb-[40px]">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-black border-[#22358114] border rounded focus:ring-0 cursor-pointer"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <span className="ml-2 text-[#515151] 2xl:text-base text-sm">Remember Me?</span>
              </label>
            </div>

            <Link
              href="/dashboard"
              className="w-full 2xl:text-[24px] block text-center bg-secondary border border-secondary hover:bg-secondary/20 hover:text-secondary duration-300 text-white 2xl:py-[20px] py-3 px-4 rounded-[7px] font-medium"
            >
              Login
            </Link>

            <div className="mt-[25px] text-center">
              <a
                href="#"
                className="text-[#515151] 2xl:text-[18px] lg:text-base text-sm font-medium hover:text-primary duration-300"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;