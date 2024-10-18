import React, { Fragment, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MainItems({ data }) {
  const [dropdown, setDropdown] = useState(true);
  const refrandom2 = useRef(Math.random());
  const location = useLocation();

  return (
    <Fragment>
      <div ref={refrandom2} onClick={() => setDropdown(!dropdown)}>
        <div className="group mb-4 flex items-center justify-between rounded border-0 border-[#D3AC46] transition-all hover:border-l-4 focus:border-l-4 focus:text-white active:border-l-4 active:text-white group-hover:text-white">
          <div className="flex items-center pl-3 ">
            {data?.icon}
            <p className="pl-2 font-inter text-base font-semibold text-[#A1A1A1] focus:text-white active:text-white group-hover:text-white">
              {data?.name}
            </p>
          </div>
          <div>
            {dropdown ? (
              <div className=" ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-up active:stroke-white group-hover:stroke-white"
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="6 15 12 9 18 15" />
                </svg>
              </div>
            ) : (
              <div className="ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-down active:stroke-white group-hover:stroke-white"
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            )}
          </div>
        </div>
        {dropdown && (
          <div className="ml-8 transition-all">
            <ul className="my-3">
              {data?.submenu?.map((submenuItem) => {
                const isActive = location.pathname === submenuItem?.url;
                return (
                  <li key={submenuItem?.id} className="my-2 w-full">
                    <Link to={submenuItem?.url}>
                      <div
                        className={`rounded px-2 py-2 font-inter text-base font-semibold transition-all ${
                          isActive
                            ? "bg-[#202023] text-white"
                            : "text-[#A1A1A1] hover:bg-[#202023] hover:text-white"
                        }`}
                      >
                        {submenuItem?.name}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </Fragment>
  );
}
