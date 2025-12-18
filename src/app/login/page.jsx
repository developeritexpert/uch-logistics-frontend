import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center relative z-[2] p-[20px] md:p-[30px]">
      <div className='mb-[30px] md:mb-[50px]'>
        <Image
          src="/img/logo.png"
          alt="Logo"
          width={300}
          height={300}
          className="w-[150px] md:w-[200px]"
        />
      </div>
      <div className="w-full max-w-[600px]">
        <div className="bg-white rounded-[25px] shadow-[0px_64px_94px_0px_#2235810D] p-[30px] md:p-[50px]">
          <div className="text-center mb-8">
            <h1 className="text-[25px] md:text-[30px] font-bold text-primary leading-[1.2]">
              Welcome Back, Admin!
            </h1>
            <p className="text-[#515151] text-sm">
              Your command center for real-time logistics control starts here.
            </p>
          </div>
          <form>
            <div className="mb-6">
              <input
                type="Enter Your Email"
                className="w-full px-4 py-3 border border-[#22358114] rounded-[7px] focus:outline-0 focus:border-[#515151] duration-300 text-sm placeholder:text-[#515151] placeholder:font-light"
                placeholder="Enter Your Email"
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                className="w-full px-4 py-3 border border-[#22358114] rounded-[7px] focus:outline-0 focus:border-[#515151] duration-300 text-sm placeholder:text-[#515151] placeholder:font-light"
                placeholder="Password"
              />
            </div>

            <div className="mb-[20px]">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-black border-[#22358114] border rounded"
                />
                <span className="ml-2 text-[#515151] text-sm">Remember Me?</span>
              </label>
            </div>

            <Link 
              href="/dashboard"
              className="w-full block text-center bg-secondary border border-secondary hover:bg-secondary/20 hover:text-secondary duration-300 text-white py-3 px-4 rounded-[7px] font-medium"
            >
              Login
            </Link>

            <div className="mt-[15px] text-center">
              <a
                href="#"
                className="text-[#515151] text-sm font-medium"
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