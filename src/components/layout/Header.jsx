"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { usePathname } from "next/navigation"

function Header({ collapsed, setcollapsed }) {
  const pathname = usePathname()

  const isDashboard = pathname === "/" || pathname === "/dashboard"

  const getPageTitle = () => {
    if (pathname === "/") return "Dashboard"

    return pathname
      .split("/")
      .filter(Boolean)
      .pop()
      .replace(/-/g, " ")
      .replace(/\b\w/g, char => char.toUpperCase())
  }
  return (
    <header className='h-[80px] 2xl:h-[120px] flex items-center gap-[30px] justify-between px-[30px] py-[20px] bg-white'>
      <div className='flex items-center gap-[36px]'>
        <div
          className='cursor-pointer'
          onClick={() => setcollapsed(!collapsed)}>
          <svg className='w-[25px]' width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="1" x2="25" y2="1" stroke="black" strokeWidth="2" />
            <line y1="9.82353" x2="25" y2="9.82353" stroke="black" strokeWidth="2" />
            <line y1="18.6471" x2="25" y2="18.6471" stroke="black" strokeWidth="2" />
          </svg>
        </div>

        <p className='text-[#223581] text-[20px] md:text-[26px] 2xl:text-[34px] font-bold'>{getPageTitle()}</p>

        {isDashboard && (
          <div className='relative ml-[20px] 2xl:ml-[40px] lg:min-w-[510px] md:min-w-[250px] max-w-[400px] 2xl:max-w-[510px]'>
            <input type='text' placeholder='Search Something here...' className='bg-[#F8FAFC] rounded-[170px] w-full py-[15px] pr-[50px] pl-[25px] border border-transparent duration-300 focus-visible:!outline-0 focus-visible:border-[#515151]' />
            <svg className='absolute right-[20px] top-[50%] -translate-y-[50%]' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.4035 16.634L12.9153 12.1458C14.0266 10.8572 14.7016 9.18193 14.7016 7.3508C14.7016 3.297 11.4036 0 7.3508 0C3.29798 0 0 3.29798 0 7.3508C0 11.4036 3.29798 14.7016 7.3508 14.7016C9.18193 14.7016 10.8572 14.0266 12.1458 12.9153L16.634 17.4035C16.7402 17.5097 16.8795 17.5632 17.0188 17.5632C17.158 17.5632 17.2973 17.5097 17.4035 17.4035C17.6168 17.1912 17.6168 16.8464 17.4035 16.634ZM7.3508 13.6127C3.89796 13.6127 1.08894 10.8036 1.08894 7.3508C1.08894 3.89796 3.89796 1.08894 7.3508 1.08894C10.8036 1.08894 13.6127 3.89796 13.6127 7.3508C13.6127 10.8036 10.8036 13.6127 7.3508 13.6127Z" fill="#515151" />
            </svg>
          </div>
        )}
      </div>

      <div>
        <Image src="/img/header-img.png" alt="User" height={50} width={50} className='rounded-full w-[50px] 2xl:w-[60px]' />
      </div>
    </header>
  )
}

export default Header