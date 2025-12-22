"use client"
import { useState } from "react";
import Image from "next/image";

function Setting() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "info@johndoe.com",
    phone: "(+00) 987 654-3210"
  });

  const handleSavePersonalInfo = () => {
    console.log("Saving personal info:", personalInfo);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setPersonalInfo({
      firstName: "John",
      lastName: "Doe",
      email: "info@johndoe.com",
      phone: "(+00) 987 654-3210"
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const EyeIcon = ({ show }) => (
    show ? (
      <svg className="w-[15px] 2xl:w-[20px]" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5.63636 20 1 12 1 12C2.015 9.747 3.558 7.607 5.06 6.06M9.9 4.24C10.5883 4.07888 11.2931 3.99834 12 4C18.3636 4 23 12 23 12C22.393 13.136 21.669 14.23 20.87 15.17M14.12 14.12C13.8454 14.4147 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88" stroke="#515151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1 1L23 23" stroke="#515151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) : (
      <svg className="w-[15px] 2xl:w-[20px]" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5C5.63636 5 1 12 1 12C1 12 5.63636 19 12 19C18.3636 19 23 12 23 12C23 12 18.3636 5 12 5Z" stroke="#515151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#515151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  );

  return (
    <div>
      <div className="w-full rounded-[15px] border border-[#22358114] bg-white px-[15px] py-[20px] sm:px-[20px] sm:py-[25px] lg:py-[35px] lg:px-[30px] mb-[30px]">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-[30px]">
          <div className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full">
            <Image
              src="/img/setting-img.png"
              alt="Profile"
              width={200}
              height={200}
              className="object-cover rounded-full w-[150px]" />
            <span className="cursor-pointer flex items-center justify-center rounded-full bg-primary absolute bottom-0 right-0 border-2 border-white h-[30px] w-[30px] md:h-[32px] md:w-[32px]">
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
            <p className="text-[18px] md:text-[20px]  2xl:text-[22px] font-black">
              {personalInfo.firstName} {personalInfo.lastName}
            </p>
            <p className="text-[16px] md:text-[18px] 2xl:text-[20px] font-medium text-primary">
              Admin
            </p>
          </div>
        </div>
      </div>

      <div className="w-full rounded-[15px] border border-[#22358114] bg-white mb-[30px]">
        <div className="flex flex-wrap sm:flex-nowrap gap-[20px] items-center justify-between px-[15px] py-[20px] sm:px-[20px] sm:py-[25px] lg:pl-[30px] lg:pr-[60px] lg:py-[20px] border-b border-[#22358114]">
          <h2 className="text-[18px] md:text-[22px] lg:text-[25px] 2xl:text-[34px] font-bold">
            Personal Information
          </h2>

          {isEditing ? (
            <div className="flex gap-3">
              <button 
                onClick={handleCancelEdit}
                className="min-w-[100px] cursor-pointer rounded-[6px] hover:bg-[#515151]/20 border border-[#22358114] hover:border-[#515151] duration-300 px-[25px] py-[10px] 2xl:text-[18px] text-sm text-[#515151] font-semibold transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleSavePersonalInfo}
                className="min-w-[100px] cursor-pointer rounded-[6px] bg-primary border border-primary px-[25px] py-[10px] 2xl:text-[18px] text-sm font-semibold text-white hover:bg-primary/20 hover:text-primary duration-300 transition"
              >
                Save
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="group flex items-center gap-2 rounded-md bg-secondary border border-secondary hover:bg-secondary/20 hover:text-secondary duration-300 px-[25px] py-[10px] min-w-[100px] 2xl:text-[18px] text-sm text-white transition"
            >
              <svg className="w-[15px] h-[15px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5442 0.531628C20.8368 -0.175716 19.6818 -0.178701 18.9744 0.531628L9.20851 10.2971C8.97869 10.527 8.81751 10.8105 8.73394 11.1239L7.5729 15.5888C7.52216 15.7888 7.57887 16.0007 7.72512 16.1469C7.83555 16.2573 7.98479 16.317 8.13701 16.317C8.18476 16.317 8.2355 16.3111 8.28326 16.2991L12.7483 15.1381C13.0617 15.0575 13.3483 14.8934 13.5751 14.6636L23.341 4.89806C24.0484 4.19071 24.0484 3.03568 23.341 2.32834L21.5442 0.528643V0.531628ZM8.95183 14.9232L9.69203 12.0789L11.7962 14.1831L8.95183 14.9232ZM12.9274 13.6697L10.2054 10.9478L17.1717 3.98179L19.8937 6.70372L12.9274 13.6697ZM20.7175 5.87998L17.9954 3.15805L18.3297 2.82378L21.0517 5.54571L20.7175 5.87998ZM22.5202 4.0773L21.8755 4.72197L19.1535 2.00004L19.7982 1.35537C19.9265 1.22703 20.0937 1.16436 20.2608 1.16436C20.4279 1.16436 20.5951 1.22703 20.7234 1.35537L22.5202 3.15507C22.7739 3.40876 22.7739 3.82361 22.5202 4.0773Z" 
                   className="fill-white duration-300 group-hover:fill-secondary"/>
                <path d="M3.05333 23.8768H19.4154C21.0987 23.8768 22.4687 22.5069 22.4687 20.8236V9.03151C22.4687 8.70918 22.2091 8.44952 21.8867 8.44952C21.5644 8.44952 21.3047 8.70918 21.3047 9.03151V20.8236C21.3047 21.8652 20.457 22.7098 19.4184 22.7098H3.05333C2.01168 22.7098 1.16701 21.8622 1.16701 20.8236V4.46213C1.16701 3.42051 2.01466 2.57588 3.05333 2.57588H14.8488C15.1712 2.57588 15.4308 2.31622 15.4308 1.99389C15.4308 1.67155 15.1712 1.4119 14.8488 1.4119H3.05333C1.36997 1.4119 0 2.78181 0 4.46511V20.8265C0 22.5098 1.36997 23.8798 3.05333 23.8798V23.8768Z" 
                   className="fill-white duration-300 group-hover:fill-secondary"/>
              </svg>
              Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-[20px] px-[15px] py-[20px] sm:px-[20px] sm:py-[25px] lg:px-[38px] lg:py-[30px] sm:grid-cols-2 md:grid-cols-3">
          <div>
            <p className="text-sm 2xl:text-[18px] text-[#515151] mb-1">First Name</p>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handleInputChange}
                className="w-full rounded-md 2xl:text-[20px] border border-[#22358114] px-4 py-2 text-sm focus:border-[#515151] duration-300 focus:outline-none"
              />
            ) : (
              <p className="font-semibold 2xl:text-[18px] text-black">{personalInfo.firstName}</p>
            )}
          </div>

          <div>
            <p className="text-sm 2xl:text-[18px] text-[#515151] mb-1">Last Name</p>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handleInputChange}
                className="w-full rounded-md 2xl:text-[20px] border border-[#22358114] px-4 py-2 text-sm focus:border-[#515151] duration-300 focus:outline-none"
              />
            ) : (
              <p className="font-semibold 2xl:text-[18px] text-black">{personalInfo.lastName}</p>
            )}
          </div>

          <div>
            <p className="text-sm 2xl:text-[18px] text-[#515151] mb-1">Email Address</p>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={personalInfo.email}
                onChange={handleInputChange}
                className="w-full rounded-md 2xl:text-[20px] border border-[#22358114] px-4 py-2 text-sm focus:border-[#515151] duration-300 focus:outline-none"
              />
            ) : (
              <p className="font-semibold 2xl:text-[18px] text-black">{personalInfo.email}</p>
            )}
          </div>

          <div>
            <p className="text-sm 2xl:text-[18px] text-[#515151] mb-1">Phone Number</p>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={personalInfo.phone}
                onChange={handleInputChange}
                className="w-full rounded-md 2xl:text-[20px] border border-[#22358114] px-4 py-2 text-sm focus:border-[#515151] duration-300 focus:outline-none"
              />
            ) : (
              <p className="font-semibold 2xl:text-[18px] text-black">{personalInfo.phone}</p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full rounded-[15px] border border-[#22358114] bg-white">
        <div className="flex gap-[20px] flex-wrap sm:flex-nowrap items-center justify-between px-[15px] py-[20px] sm:px-[20px] sm:py-[25px] lg:pl-[30px] lg:pr-[60px] lg:py-[20px] border-b border-[#22358114]">
          <h2 className="text-[18px] md:text-[22px] lg:text-[25px] 2xl:text-[34px] font-semibold text-black">
            Password
          </h2>

          <div className="flex gap-3 items-center">
            <button className="min-w-[100px] cursor-pointer rounded-[6px] border hover:bg-[#515151]/20 border-[#22358114] hover:border-[#515151] duration-300 px-[25px] py-[10px] 2xl:text-[18px] text-sm text-[#515151] font-semibold transition">
              Cancel
            </button>
            <button className="min-w-[100px] cursor-pointer rounded-[6px] bg-primary border border-primary px-[25px] py-[10px] 2xl:text-[18px] text-sm font-semibold text-white hover:bg-primary/20 hover:text-primary duration-300 transition">
              Save
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 px-[15px] py-[20px] sm:px-[20px] sm:py-[25px] lg:px-[38px] lg:py-[30px] sm:grid-cols-2 md:grid-cols-3">
          <div>
            <label className="mb-2 block 2xl:text-base text-sm text-[#515151]">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="********"
                className="w-full rounded-[5px] border border-[#22358114] px-4 py-2 md:text-[16px] lg:text-[18px] 2xl:text-[20px] text-sm focus:border-[#515151] duration-300 focus:outline-none"
              />
              <button
                onClick={() => setShowCurrent(!showCurrent)}
                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-[#515151]"
              >
                <EyeIcon show={showCurrent} />
              </button>
            </div>
          </div>
          
          <div>
            <label className="mb-2 block 2xl:text-base text-sm text-[#515151]">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="********"
                className="w-full rounded-[5px] border border-[#22358114] px-4 py-2 md:text-[16px] lg:text-[18px] 2xl:text-[20px] text-sm focus:border-[#515151] duration-300 focus:outline-none"
              />
              <button
                onClick={() => setShowNew(!showNew)}
                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-[#515151]"
              >
                <EyeIcon show={showNew} />
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block 2xl:text-base text-sm text-[#515151]">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="********"
                className="w-full rounded-[5px] border border-[#22358114] px-4 py-2 md:text-[16px] lg:text-[18px] 2xl:text-[20px] text-sm focus:border-[#515151] duration-300 focus:outline-none"
              />
              <button
                onClick={() => setShowConfirm(!showConfirm)}
                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-[#515151]"
              >
                <EyeIcon show={showConfirm} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;