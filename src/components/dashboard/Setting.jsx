"use client"
import { useState } from "react";
import Image from "next/image";

function Setting() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div>

      <div className="w-full rounded-[15px] border border-[#22358114] bg-white px-[15px] py-[20px] sm:px-[20px]  sm:py-[25px]  lg:py-[35px] lg:px-[30px] mb-[30px]">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-[30px]">
          <div className="relative  w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[130px] md:h-[120px] lg:w-[150px] lg:h-[150px] rounded-full ">
            <Image
              src="/img/setting-img.png"
              alt="Profile"
              width={200}
              height={200}
              className="object-cover" />

            <span className=" flex  items-center justify-center rounded-full bg-primary absolute  bottom-0 right-0 sm:bottom-1 sm:right-1 lg:bottom-2 lg:right-2 border-2 border-white h-[30px] w-[30px] md:h-[36px] md:w-[36px]">
              <svg
                className="w-[12px] h-[10px] md:w-[16px] md:h-[14px]"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.5714 7.63636C11.5714 9.04272 10.4207 10.1818 9 10.1818C7.5793 10.1818 6.42857 9.04272 6.42857 7.63636C6.42857 6.23001 7.5793 5.09091 9 5.09091C10.4207 5.09091 11.5714 6.23001 11.5714 7.63636ZM18 4.45455V12.0909C18 13.1409 17.1321 14 16.0714 14H1.92857C0.867867 14 0 13.1409 0 12.0909V4.45455C0 3.40456 0.867867 2.54545 1.92857 2.54545H4.78286C5.07857 2.54545 5.33571 2.34818 5.40642 2.06182L5.5607 1.44456C5.77928 0.591828 6.54427 0 7.43143 0H10.5686C11.4557 0 12.2207 0.591808 12.4393 1.44456L12.5936 2.06182C12.6643 2.34817 12.9214 2.54545 13.2171 2.54545H16.0714C17.1321 2.54545 18 3.40456 18 4.45455ZM12.8571 7.63636C12.8571 5.52995 11.1279 3.81818 9 3.81818C6.87213 3.81818 5.14286 5.52999 5.14286 7.63636C5.14286 9.74274 6.87213 11.4545 9 11.4545C11.1279 11.4545 12.8571 9.74274 12.8571 7.63636Z"
                  fill="white"
                />
              </svg>
            </span>

          </div>
          <div>
            <p className="text-[18px] md:text-[22px] font-black sm:mb-[7px]">
              John Doe
            </p>
            <p className="  text-[16px] md:text-[20px] font-medium text-primary">
              Admin
            </p>
          </div>
        </div>
      </div>

      <div className="w-full rounded-[15px] border border-[#22358114] bg-white  mb-[30px]">


        <div className="flex flex-wrap sm:flex-nowrap gap-[20px] items-center justify-between  px-[15px] py-[20px] sm:px-[20px]  sm:py-[25px]   lg:pl-[30px] lg:pr-[60px] lg:py-[20px] border-b border-[#22358114]">
          <h2 className="text-[20px] md:text-[26px] lg:text-[34px] font-bold">
            Personal Information
          </h2>

          <button className="flex items-center gap-2 rounded-md bg-secondary px-[20px] py-[11px] text-sm text-white  transition">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.5442 0.531628C20.8368 -0.175716 19.6818 -0.178701 18.9744 0.531628L9.20851 10.2971C8.97869 10.527 8.81751 10.8105 8.73394 11.1239L7.5729 15.5888C7.52216 15.7888 7.57887 16.0007 7.72512 16.1469C7.83555 16.2573 7.98479 16.317 8.13701 16.317C8.18476 16.317 8.2355 16.3111 8.28326 16.2991L12.7483 15.1381C13.0617 15.0575 13.3483 14.8934 13.5751 14.6636L23.341 4.89806C24.0484 4.19071 24.0484 3.03568 23.341 2.32834L21.5442 0.528643V0.531628ZM8.95183 14.9232L9.69203 12.0789L11.7962 14.1831L8.95183 14.9232ZM12.9274 13.6697L10.2054 10.9478L17.1717 3.98179L19.8937 6.70372L12.9274 13.6697ZM20.7175 5.87998L17.9954 3.15805L18.3297 2.82378L21.0517 5.54571L20.7175 5.87998ZM22.5202 4.0773L21.8755 4.72197L19.1535 2.00004L19.7982 1.35537C19.9265 1.22703 20.0937 1.16436 20.2608 1.16436C20.4279 1.16436 20.5951 1.22703 20.7234 1.35537L22.5202 3.15507C22.7739 3.40876 22.7739 3.82361 22.5202 4.0773Z" fill="white" />
              <path d="M3.05333 23.8768H19.4154C21.0987 23.8768 22.4687 22.5069 22.4687 20.8236V9.03151C22.4687 8.70918 22.2091 8.44952 21.8867 8.44952C21.5644 8.44952 21.3047 8.70918 21.3047 9.03151V20.8236C21.3047 21.8652 20.457 22.7098 19.4184 22.7098H3.05333C2.01168 22.7098 1.16701 21.8622 1.16701 20.8236V4.46213C1.16701 3.42051 2.01466 2.57588 3.05333 2.57588H14.8488C15.1712 2.57588 15.4308 2.31622 15.4308 1.99389C15.4308 1.67155 15.1712 1.4119 14.8488 1.4119H3.05333C1.36997 1.4119 0 2.78181 0 4.46511V20.8265C0 22.5098 1.36997 23.8798 3.05333 23.8798V23.8768Z" fill="white" />
            </svg>
            Edit
          </button>
        </div>


        <div className="grid grid-cols-1 gap-y-6    px-[15px] py-[20px] sm:px-[20px]  sm:py-[25px]  lg:px-[38px] lg:py-[30px] sm:grid-cols-2 md:grid-cols-3">

          <div>
            <p className="text-sm text-gray-500">First Name</p>
            <p className="mt-1 font-medium text-black">John</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Last Name</p>
            <p className="mt-1 font-medium text-black">Doe</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="mt-1 font-medium text-black">
              info@johndoe.com
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="mt-1 font-medium text-black">
              (+00) 987 654-3210
            </p>
          </div>

        </div>
      </div>


      <div className="w-full rounded-[15px] border border-[#22358114] bg-white">

        <div className="flex gap-[20px] flex-wrap sm:flex-nowrap items-center justify-between  px-[15px] py-[20px] sm:px-[20px]  sm:py-[25px]   lg:pl-[30px] lg:pr-[60px] lg:py-[20px] border-b border-[#22358114]">
          <h2 className="text-[20px] md:text-[26px]  lg:text-[34px] font-semibold text-black">
            Password
          </h2>

          <div className="flex gap-3">
            <button className="rounded-md border border-[#22358114] px-[20px] py-[12px] text-sm text-gray-600 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button className="rounded-md bg-[#223581] px-[20px] py-[12px] text-sm text-white hover:bg-[#1b2e6d] transition">
              Save
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6  px-[15px] py-[20px] sm:px-[20px]  sm:py-[25px]  lg:px-[38px] lg:py-[30px]   sm:grid-cols-2 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm text-gray-500">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value="********"
                readOnly
                className="w-full rounded-md border border-[#22358114] px-4 py-3 text-sm focus:border-[#515151] focus:outline-none" />
              <button
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.92725 2.01697C7.70555 2.01697 5.89844 3.82403 5.89844 6.04578C5.89844 8.26753 7.7055 10.0746 9.92725 10.0746C12.149 10.0746 13.9561 8.26753 13.9561 6.04578C13.9561 3.82403 12.149 2.01697 9.92725 2.01697ZM9.92725 9.37929C8.0894 9.37929 6.59374 7.88367 6.59374 6.04578C6.59374 4.20789 8.08936 2.71227 9.92725 2.71227C11.7651 2.71227 13.2608 4.20789 13.2608 6.04578C13.2608 7.88367 11.7651 9.37929 9.92725 9.37929Z" fill="#515151" />
                  <path d="M9.92909 0C4.52613 0 0.249093 5.59857 0.069937 5.83776C-0.0233123 5.96179 -0.0233123 6.13199 0.069937 6.25603C0.249195 6.49322 4.52613 12.0919 9.92909 12.0919C15.3321 12.0919 19.6091 6.49336 19.7882 6.25417C19.8815 6.13014 19.8815 5.95995 19.7882 5.8359C19.609 5.59871 15.3321 0 9.92909 0ZM9.92909 11.3965C5.44231 11.3965 1.62255 7.05801 0.791429 6.04588C1.62252 5.03281 5.44207 0.695302 9.92909 0.695302C14.4161 0.695302 18.2366 5.03376 19.0667 6.04588C18.2366 7.05896 14.4161 11.3965 9.92909 11.3965Z" fill="#515151" />
                </svg>

              </button>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm text-gray-500">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                className="w-full rounded-md border border-[#22358114] px-4 py-3 text-sm focus:border-[#515151] focus:outline-none" />
              <button
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.92725 2.01697C7.70555 2.01697 5.89844 3.82403 5.89844 6.04578C5.89844 8.26753 7.7055 10.0746 9.92725 10.0746C12.149 10.0746 13.9561 8.26753 13.9561 6.04578C13.9561 3.82403 12.149 2.01697 9.92725 2.01697ZM9.92725 9.37929C8.0894 9.37929 6.59374 7.88367 6.59374 6.04578C6.59374 4.20789 8.08936 2.71227 9.92725 2.71227C11.7651 2.71227 13.2608 4.20789 13.2608 6.04578C13.2608 7.88367 11.7651 9.37929 9.92725 9.37929Z" fill="#515151" />
                  <path d="M9.92909 0C4.52613 0 0.249093 5.59857 0.069937 5.83776C-0.0233123 5.96179 -0.0233123 6.13199 0.069937 6.25603C0.249195 6.49322 4.52613 12.0919 9.92909 12.0919C15.3321 12.0919 19.6091 6.49336 19.7882 6.25417C19.8815 6.13014 19.8815 5.95995 19.7882 5.8359C19.609 5.59871 15.3321 0 9.92909 0ZM9.92909 11.3965C5.44231 11.3965 1.62255 7.05801 0.791429 6.04588C1.62252 5.03281 5.44207 0.695302 9.92909 0.695302C14.4161 0.695302 18.2366 5.03376 19.0667 6.04588C18.2366 7.05896 14.4161 11.3965 9.92909 11.3965Z" fill="#515151" />
                </svg>

              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-500">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                className="w-full rounded-md border border-[#22358114] px-4 py-3 text-sm focus:border-[#515151] focus:outline-none"
              />
              <button
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.92725 2.01697C7.70555 2.01697 5.89844 3.82403 5.89844 6.04578C5.89844 8.26753 7.7055 10.0746 9.92725 10.0746C12.149 10.0746 13.9561 8.26753 13.9561 6.04578C13.9561 3.82403 12.149 2.01697 9.92725 2.01697ZM9.92725 9.37929C8.0894 9.37929 6.59374 7.88367 6.59374 6.04578C6.59374 4.20789 8.08936 2.71227 9.92725 2.71227C11.7651 2.71227 13.2608 4.20789 13.2608 6.04578C13.2608 7.88367 11.7651 9.37929 9.92725 9.37929Z" fill="#515151" />
                  <path d="M9.92909 0C4.52613 0 0.249093 5.59857 0.069937 5.83776C-0.0233123 5.96179 -0.0233123 6.13199 0.069937 6.25603C0.249195 6.49322 4.52613 12.0919 9.92909 12.0919C15.3321 12.0919 19.6091 6.49336 19.7882 6.25417C19.8815 6.13014 19.8815 5.95995 19.7882 5.8359C19.609 5.59871 15.3321 0 9.92909 0ZM9.92909 11.3965C5.44231 11.3965 1.62255 7.05801 0.791429 6.04588C1.62252 5.03281 5.44207 0.695302 9.92909 0.695302C14.4161 0.695302 18.2366 5.03376 19.0667 6.04588C18.2366 7.05896 14.4161 11.3965 9.92909 11.3965Z" fill="#515151" />
                </svg>

              </button>
            </div>
          </div>

        </div>
      </div>


    </div>
  )
}

export default Setting