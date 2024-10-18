import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/Auth/login.css";
const RecoverAccount = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#EAC975B2] py-5">
      <div className="mx-auto min-w-[250px] rounded-t-xl rounded-b-lg bg-black md:min-w-[400px] lg:min-w-[600px]">
        <div className="login_banner rounded-lg py-[5.875rem]">
          <div className="text-center">
            <h2 className="poppins-600 text-[2rem] leading-[2.6rem]">
              Recover Acount
            </h2>
          </div>
        </div>
        <form action="">
          <div className="px-8  pt-[4.063rem] pb-[6rem] sm:px-[3.125rem]">
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <label
                  className="inter-500 text-base leading-[1.3rem] text-[#999999]"
                  for="Username">
                  Email Address<span className="text-[#D3AC46]">*</span>
                </label>
                <input
                  className="poppins-400 rounded border-[0.031rem] border-[#fff] bg-transparent px-4 py-2.5 text-lg leading-[1.463rem] text-[#fff]"
                  type="text"
                  name="Username"
                />
              </div>
              <div className="text-left">
                <Link
                  className="poppins-500 text-base leading-[1.3rem] text-white hover:text-blue-500 hover:underline hover:underline-offset-2"
                  to="/login">
                  Login Here
                </Link>
              </div>
              <div>
                <button className="inter-600 w-full bg-[#D3AC46] p-2.5 text-base leading-[1.3rem] tracking-[2%] text-[#222222]">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoverAccount;
