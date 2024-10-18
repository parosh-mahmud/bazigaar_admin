import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Auth/login.css";
import HotToaster from "../../Component/Shared/HotToaster";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UnAuth } from "./UnAuth";
import { ENDPOINT } from "../../App/config/endpoint";

const Login = ({ isLoading, setIsLoading }) => {
  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function LoginFun(e) {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_MAIN_URL}/api/sup-admin/admin-login/`,
        LoginInfo
      )
      .then((res) => {
        if (res.data.type === "error") {
          toast.error(res.data.msg);
          setIsLoading(false);
        } else {
          console.log("Res",res)
          localStorage.setItem(
            "authInfo",
            JSON.stringify({
              token: res.data.token,
              user: res.data,
            })
          );
          toast.success("Login Successful");
          navigate("/", { replace: true });
          setIsLoading(false);

          setTimeout(() => {
            const token = JSON.parse(localStorage.getItem("authInfo"));
            axios
              .get(
                `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.wallet.getWallet}`,
                {
                  headers: {
                    Authorization: "token " + token?.token,
                  },
                }
              )
              .then((res) => {
                if (res.data.type === "error") {
                  toast.error(res.data.msg);
                } else {
                  localStorage.setItem("WalletID", JSON.stringify(res.data));
                }
              })
              .catch((e) => {
                // console.log(e);
                UnAuth(e);
              });
          }, 2000);
        }
      })
      .catch((e) => {
        // console.log(e)
        UnAuth(e);
        setIsLoading(false);
      });
  }

  return (
    <Fragment>
     
      <HotToaster />
      <form className="flex min-h-screen w-full items-center justify-center bg-[#EAC975B2] py-5">
        <div className="mx-auto min-w-[250px] rounded-b-lg rounded-t-xl bg-black md:min-w-[400px] lg:min-w-[600px]">
          <div className="login_banner rounded-lg pb-[4.938rem] pt-[4.875rem]">
            <div className="px-2 text-center">
              <h2 className="mb-2 font-poppins text-[2rem] leading-[2.6rem]">
                Welcome To Bazigaar
              </h2>
              <h2 className="text-lg leading-[1.463rem]">
                Super Admin Login To Bazigaar Dashboard
              </h2>
            </div>
          </div>
          <div className="px-[1rem] pb-[5rem] pt-[4.063rem] md:px-[2.125rem] lg:px-[3.125rem]">
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <label
                  className="inter-500 text-base leading-[1.3rem] text-[#999999]"
                  htmlFor="Username">
                  Username or Email<span className="text-[#D3AC46]">*</span>
                </label>
                <input
                  className="poppins-400 rounded border-[0.031rem] border-[#fff] bg-transparent px-4 py-2.5 text-lg leading-[1.463rem] text-[#fff]"
                  type="text"
                  placeholder="Email or Username"
                  value={LoginInfo.email || ""}
                  onChange={(e) =>
                    setLoginInfo({ ...LoginInfo, email: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <label className="inter-500 text-base leading-[1.3rem] text-[#999999]">
                  Password<span className="text-[#D3AC46]">*</span>
                </label>
                <input
                  className="poppins-400 rounded border-[0.031rem] border-[#fff] bg-transparent px-4 py-2.5 text-lg leading-[1.463rem] text-[#fff]"
                  type="password"
                  placeholder="Password"
                  value={LoginInfo.password || ""}
                  onChange={(e) =>
                    setLoginInfo({ ...LoginInfo, password: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex flex-wrap items-center  ">
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label
                    className="cursor-pointer pl-2 text-base leading-[1.3rem] text-[#fff]"
                    htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>
                <div>
                  <Link
                    className="font-poppins text-base leading-[1.3rem] text-white hover:text-blue-500 hover:underline hover:underline-offset-2"
                    to="/recover-account">
                    Forget Password?
                  </Link>
                </div>
              </div>
              <div>
                {LoginInfo.email === "" || LoginInfo.password === "" ? (
                  <button
                    disabled
                    className=" inter-600 w-full bg-[#D3AC36] p-2.5 text-base font-bold leading-[1.3rem] tracking-[2%] text-[#222202]">
                    Login Disabled
                  </button>
                ) : (
                  <button
                    onClick={(e) => LoginFun(e)}
                    className="inter-600 w-full bg-[#D3AC46] p-2.5 text-base font-bold leading-[1.3rem] tracking-[2%] text-[#222222]">
                    {isLoading === true ? "Loading...." : "LOGIN"}
                  </button>
                )}
              </div>
              <div>
                <p className="text-center font-poppins text-base leading-[1.3rem] text-white">
                  New User?{" "}
                  <Link
                    className="font-poppins text-base leading-[1.3rem] text-white hover:text-blue-500 hover:underline hover:underline-offset-2"
                    to="/registration">
                    Register Now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
