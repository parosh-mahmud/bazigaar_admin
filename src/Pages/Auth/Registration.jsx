import React from 'react';
import { Link } from 'react-router-dom';
import "../../Styles/Auth/login.css";

const Registration = () => {
	return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#EAC975B2] py-5">
      <div className="mx-auto min-w-[250px] rounded-t-xl rounded-b-lg bg-black md:min-w-[400px] lg:min-w-[600px]">
        <div className="login_banner rounded-lg pt-[4.875rem] pb-[4.938rem]">
          <div className="px-2 text-center">
            <h2 className="mb-2 font-poppins text-[2rem] leading-[2.6rem]">
              Welcome To Bazigaar
            </h2>
            <h2 className="text-lg leading-[1.463rem]">
              Admin Registration To Bazigaar Dashboard
            </h2>
          </div>
        </div>
        <form action="">
          <div className="px-[1rem] pt-[4.063rem] pb-[5rem] md:px-[2.125rem] lg:px-[3.125rem]">
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <label
                  className="font-inter text-base font-medium leading-[1.3rem] text-[#999999]"
                  for="Username">
                  Username<span className="text-[#D3AC46]">*</span>
                </label>
                <input
                  className="rounded border-[0.031rem] border-[#fff] bg-transparent px-4 py-2.5 font-poppins text-lg font-normal leading-[1.463rem] text-[#fff]"
                  type="text"
                  name="Username"
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <label
                  className="font-inter text-base font-medium leading-[1.3rem] text-[#999999]"
                  for="Username">
                  Password<span className="text-[#D3AC46]">*</span>
                </label>
                <input
                  className="rounded border-[0.031rem] border-[#fff] bg-transparent px-4 py-2.5 font-poppins text-lg font-normal leading-[1.463rem] text-[#fff]"
                  type="password"
                  name="Username"
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <label
                  className="font-inter text-base font-medium leading-[1.3rem] text-[#999999]"
                  for="Username">
                  Confirm Password<span className="text-[#D3AC46]">*</span>
                </label>
                <input
                  className="rounded border-[0.031rem] border-[#fff] bg-transparent px-4 py-2.5 font-poppins text-lg font-normal leading-[1.463rem] text-[#fff]"
                  type="password"
                  name="Username"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex flex-wrap items-center">
                  <input className="" type="checkbox" />
                  <label className="pl-2 text-base leading-[1.3rem] text-[#fff]">
                    Remember Me
                  </label>
                </div>
              </div>
              <div>
                <button className="inter-600 w-full bg-[#D3AC46] p-2.5 text-base leading-[1.3rem] tracking-[2%] text-[#222222]">
                  SUBMIT
                </button>
              </div>
              <div>
                <p className="text-center font-poppins text-base leading-[1.3rem] text-white">
                  Already User?{" "}
                  <Link
                    className="font-poppins text-base leading-[1.3rem] text-white hover:text-blue-500 hover:underline hover:underline-offset-2"
                    to="/login">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;