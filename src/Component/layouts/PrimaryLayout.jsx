import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuItems from "./MenuItems";
import HotToaster from "../Shared/HotToaster";
import axios from "axios";
import { ENDPOINT } from "../../App/config/endpoint";
import { toast } from "react-hot-toast";
import { UnAuth } from "../../Pages/Auth/UnAuth";
import { PrimaryLogo, UsFlagIcon } from "../../Assets/locales/DashboardIcons";

export default function PrimaryLayout({ children, pageTitle }) {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  // navfix State
  const [navfix, setNavfix] = useState(false);
  const authInfo = JSON.parse(localStorage.getItem("authInfo"));
  const data = JSON.parse(localStorage.getItem("WalletID"));

  // console.log(authInfo.user.username)
  const navigate = useNavigate();
  // navfix
  function setFixed() {
    setNavfix(true);
  }
  useEffect(() => {
    window.addEventListener("scroll", setFixed);
  }, []);

  const sidebarRef = useRef(null);

  useEffect(() => {
    // Restore scroll position on component mount
    const savedScrollPosition = sessionStorage.getItem("sidebarScrollPosition");
    if (savedScrollPosition && sidebarRef.current) {
      sidebarRef.current.scrollTop = savedScrollPosition;
    }

    // Save scroll position on page unload or before navigating away
    const saveScrollPosition = () => {
      if (sidebarRef.current) {
        sessionStorage.setItem(
          "sidebarScrollPosition",
          sidebarRef.current.scrollTop
        );
      }
    };

    window.addEventListener("beforeunload", saveScrollPosition);
    window.addEventListener("popstate", saveScrollPosition); // Handle browser back/forward

    return () => {
      saveScrollPosition();
      window.removeEventListener("beforeunload", saveScrollPosition);
      window.removeEventListener("popstate", saveScrollPosition);
    };
  }, []);
  const handleLogout = () => {
    const token = JSON.parse(localStorage.getItem("authInfo"));

    axios
      .post(`${process.env.REACT_APP_MAIN_URL}${ENDPOINT.logout.userLogout}`, {
        headers: {
          Authorization: "token " + token.token,
        },
      })
      .then((res) => {
        console.log("res", res);
        if (res.data.type === "error") {
          toast.error(res.data.msg);
        } else {
          localStorage.removeItem("authInfo");
          localStorage.clear();
          navigate("/login", { replace: true });
        }
      })
      .catch((e) => {
        // console.log(e)
        UnAuth(e);
      });
  };
  return (
    <Fragment>
      <HotToaster />
      <div className="min-h-screen w-full bg-white">
        <div className="flex-no-wrap flex min-h-screen">
          {/* desktop Sidebar starts */}
          <div className="lg:!min-w-[25%] xl:!min-w-[19%] 2xl:!min-w-[15%]">
            <div
              className={`${
                navfix
                  ? "!fixed top-0 z-10 !min-w-full lg:left-0 lg:!min-w-[22%] xl:!min-w-[18%] 2xl:!min-w-[15%]"
                  : "absolute top-0 z-10 !min-w-full lg:left-0 lg:!min-w-[22%] xl:!min-w-[18%] 2xl:!min-w-[15%]"
              }`}
            >
              <div className="absolute left-0 top-0 hidden min-h-[100%] bg-black shadow lg:relative lg:block">
                <div className="flex h-16 w-full items-center px-6">
                  <Link
                    to="/"
                    className="flex cursor-pointer items-center gap-2 text-2xl font-bold text-white"
                  >
                    <PrimaryLogo />
                    <span className="text-2xl font-semibold leading-[31.20px] text-neutral-200">
                      Bazigaar
                    </span>
                  </Link>
                </div>
                <div
                  className={`min-h-screen  overflow-y-auto px-6 pb-20 pt-8 ${
                    navfix ? "scrollbar-thin scrollbar-thumb-gray-700" : ""
                  }`}
                  style={{
                    maxHeight: navfix ? "100vh" : "unset",
                  }}
                >
                  <MenuItems />
                </div>
              </div>
            </div>
          </div>

          {/*Mobile responsive sidebar*/}
          <div
            className={
              show
                ? "absolute z-40 min-h-screen w-full  translate-x-0  transform "
                : "absolute z-40 min-h-screen w-full  -translate-x-full transform"
            }
            id="mobile-nav"
          >
            <div
              className="absolute h-full w-full bg-gray-800 opacity-50 lg:hidden"
              onClick={() => setShow(!show)}
            />
            <div className="relative z-40 min-h-screen w-64 bg-black pb-4 shadow transition duration-150 ease-in-out  md:w-96 lg:hidden">
              <div className="flex h-full w-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between px-6">
                    <div className="flex h-16 w-full items-center">
                      <Link
                        to="/"
                        className="flex cursor-pointer items-center gap-2 text-xl font-bold text-white"
                      >
                        <PrimaryLogo />
                        <span className="text-xl font-semibold leading-[31.20px] text-neutral-200">
                          Bazigaar
                        </span>
                      </Link>
                    </div>
                    <div
                      id="closeSideBar"
                      className="flex h-10 w-10 items-center justify-center"
                      onClick={() => setShow(!show)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-x text-white"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1={18} y1={6} x2={6} y2={18} />
                        <line x1={6} y1={6} x2={18} y2={18} />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <MenuItems />
                  </div>
                </div>
                <div className="w-full">
                  <div className="mb-4 flex w-full justify-center px-6">
                    <div className="relative w-full">
                      <div className="absolute inset-0 m-auto ml-4 h-4 w-4 text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-search"
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="#A0AEC0"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <circle cx={10} cy={10} r={7} />
                          <line x1={21} y1={21} x2={15} y2={15} />
                        </svg>
                      </div>
                      <input
                        className="w-full rounded bg-gray-200 py-2 pl-10 text-sm  text-gray-500 focus:outline-none"
                        type="text"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <div className="border-t border-gray-300">
                    <div
                      className={`flex w-full items-center justify-between p-6 ${
                        profile && "pb-20"
                      }`}
                    >
                      <div
                        className="relative flex cursor-pointer items-center"
                        onClick={() => setProfile(!profile)}
                      >
                        <div className="rounded-full">
                          {profile ? (
                            <ul className="absolute left-0 mt-12 w-full rounded border-r bg-white p-2 shadow sm:mt-16 ">
                              <li className="flex w-full cursor-pointer items-center justify-between text-gray-600 hover:text-indigo-700">
                                <div className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-user"
                                    width={18}
                                    height={18}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx={12} cy={7} r={4} />
                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                  </svg>
                                  <span className="ml-2 text-sm">
                                    My Profile
                                  </span>
                                </div>
                              </li>
                              <li className="mt-2 flex w-full cursor-pointer items-center justify-between text-gray-600 hover:text-indigo-700">
                                <div className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-logout"
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                    <path d="M7 12h14l-3 -3m0 6l3 -3" />
                                  </svg>
                                  <span
                                    onClick={() => handleLogout()}
                                    className="ml-2 text-sm"
                                  >
                                    Sign out
                                  </span>
                                </div>
                              </li>
                            </ul>
                          ) : (
                            ""
                          )}
                          <div className="relative">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={`${process.env.REACT_APP_MAIN_URL}${data?.user?.profile_picture}`}
                              alt={authInfo?.user?.username}
                            />
                          </div>
                        </div>
                        <div className="ml-3 mr-6">
                          <p className="font-poppins text-base font-medium uppercase text-white">
                            {authInfo?.user?.username}
                          </p>
                          <p className="font-regular font-poppins text-sm text-[#737791]">
                            {authInfo?.user?.is_admin === true
                              ? "Admin"
                              : authInfo?.user?.isReseller === true
                              ? "Reseller"
                              : authInfo?.user?.is_agent === true
                              ? "Agent"
                              : authInfo?.user?.isHost === true
                              ? "Host"
                              : "User"}
                          </p>
                        </div>
                        <div className="cursor-pointer text-gray-600">
                          <svg
                            aria-haspopup="true"
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-chevron-down"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Mobile responsive sidebar*/}
          {/* Sidebar ends */}
          <div className="w-full lg:!min-w-[75%] xl:!min-w-[81%] 2xl:!min-w-[85%]">
            {/* Navigation starts */}
            <div
              className={`${
                navfix
                  ? "!fixed top-0 z-10 !min-w-full lg:right-0 lg:!min-w-[75%] xl:!min-w-[81%] 2xl:!min-w-[85%]"
                  : "absolute top-0 z-10 !min-w-full lg:right-0 lg:!min-w-[75%] xl:!min-w-[81%] 2xl:!min-w-[85%]"
              }`}
            >
              <nav
                className={`z-10 flex h-16 items-center justify-end bg-white shadow lg:h-24 lg:items-stretch lg:justify-between`}
              >
                <div className="hidden w-full items-center bg-[#F1F3F7] px-10 lg:flex">
                  <div className="hidden h-full w-[65%] items-center lg:flex">
                    <div className="relative w-full">
                      <div className="absolute inset-0 m-auto ml-4 h-4 w-4 text-black">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-search"
                          width={17}
                          height={17}
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <circle cx={10} cy={10} r={7} />
                          <line x1={21} y1={21} x2={15} y2={15} />
                        </svg>
                      </div>
                      <input
                        className="w-full rounded-lg bg-white px-12 py-3 font-poppins text-[18px] font-normal text-[#999999] focus:border-indigo-700 focus:outline-none"
                        type="text"
                        placeholder="Search here"
                        // onChange={}
                      />
                    </div>
                  </div>
                  <div className="hidden w-[35%] lg:flex">
                    <div className="flex w-full items-center justify-end gap-5">
                      <div className="flex items-center justify-start gap-3.5">
                        <UsFlagIcon />
                        <select
                          className="bg-transparent pr-2 focus:outline-none"
                          name=""
                          id=""
                        >
                          <option
                            className="text-lg font-semibold text-slate-700"
                            value="Eng(US)"
                          >
                            Eng (US)
                          </option>
                        </select>
                      </div>

                      <div
                        className="relative flex cursor-pointer items-center"
                        onClick={() => setProfile(!profile)}
                      >
                        <div className="rounded-full">
                          {profile ? (
                            <ul className="absolute left-0 mt-12 w-full rounded border-r bg-white p-2 shadow sm:mt-16 ">
                              {/* <li className="flex w-full cursor-pointer items-center justify-between text-gray-600 hover:text-indigo-700">
                                <div className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-user"
                                    width={18}
                                    height={18}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx={12} cy={7} r={4} />
                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                  </svg>
                                  <span className="ml-2 text-sm">
                                    My Profile
                                  </span>
                                </div>
                              </li> */}
                              <li className="mt-2 flex w-full cursor-pointer items-center justify-between text-gray-600 hover:text-indigo-700">
                                <div className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-logout"
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                    <path d="M7 12h14l-3 -3m0 6l3 -3" />
                                  </svg>
                                  <span
                                    onClick={() => handleLogout()}
                                    className="ml-2 text-sm"
                                  >
                                    Sign out
                                  </span>
                                </div>
                              </li>
                            </ul>
                          ) : (
                            ""
                          )}
                          <div className="relative">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={`${process.env.REACT_APP_MAIN_URL}${data?.user?.profile_picture}`}
                              alt={authInfo?.user?.username}
                            />
                            {/* console.log(`{"this is test"}${authInfo?.user?.username}`) */}
                            {/* <div className="absolute inset-0 m-auto mb-0 mr-0 h-2 w-2 rounded-full border border-white bg-green-400" /> */}
                          </div>
                        </div>
                        <div className="ml-3 mr-6">
                          <p className="font-poppins text-base font-medium uppercase text-[#151D48]">
                            {authInfo?.user?.username}
                          </p>
                          <p className="font-regular font-poppins text-sm text-[#737791]">
                            {authInfo?.user?.is_admin === true
                              ? "Admin"
                              : authInfo?.user?.isReseller === true
                              ? "Reseller"
                              : authInfo?.user?.is_agent === true
                              ? "Agent"
                              : authInfo?.user?.isHost === true
                              ? "Host"
                              : "User"}
                          </p>
                        </div>
                        <div className="cursor-pointer text-gray-600">
                          <svg
                            aria-haspopup="true"
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-chevron-down"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="visible relative w-full px-4 text-gray-600 lg:hidden">
                  {show ? (
                    " "
                  ) : (
                    <div className="flex w-full items-center justify-between">
                      <Link
                        to="/"
                        className="flex cursor-pointer items-center gap-2 text-2xl font-bold text-white"
                      >
                        <PrimaryLogo />
                        <span className="text-2xl font-semibold leading-[31.20px] text-neutral-700">
                          Bazigaar
                        </span>
                      </Link>
                      <svg
                        onClick={() => setShow(!show)}
                        aria-label="Main Menu"
                        aria-haspopup="true"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-menu cursor-pointer"
                        width={30}
                        height={30}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1={4} y1={8} x2={20} y2={8} />
                        <line x1={4} y1={16} x2={20} y2={16} />
                      </svg>
                    </div>
                  )}
                </div>
              </nav>
            </div>
            {/* Navigation ends */}

            <div className="mx-auto mt-10 px-4 py-10 lg:mt-20 lg:px-10">
              <h1 className="py-3 font-poppins text-xl font-semibold text-blackText lg:text-3xl">
                {pageTitle}
              </h1>
              {children}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
