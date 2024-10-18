import React, { Fragment, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import MainItems from "./MainItems";

export default function Items({ data }) {
  const refrandom = useRef(Math.random());
  const location = useLocation();
  return (
    <Fragment>
      <li
        ref={refrandom}
        className="mb-4 rounded-r pt-5 text-sm leading-3 tracking-normal text-[#A1A1A1] group-hover:text-white"
      >
        <h1 className="pb-4 font-inter text-[12px] font-medium text-[#A1A1A1] group-hover:text-white">
          {data?.title}
        </h1>
        {data?.mainMenus?.map((menuItem, j) => {
          const isActive = location.pathname === menuItem?.url;

          return menuItem?.submenu?.length > 0 ? (
            <MainItems data={menuItem} key={menuItem?.id || j} />
          ) : (
            <Link
              key={menuItem?.id}
              to={menuItem?.url}
              className={`group mb-4 flex items-center rounded border-0 border-[#D3AC46] transition-all hover:border-l-4 hover:text-white focus:border-l-4 active:border-l-4 ${
                isActive ? "border-l-4 text-white" : "text-[#A1A1A1]"
              }`}
            >
              <div className="flex items-center pl-3">
                {menuItem?.icon}
                <span
                  className={`pl-2 font-inter text-base font-semibold ${
                    isActive ? "text-white" : "text-[#A1A1A1]"
                  } group-hover:text-white`}
                >
                  {menuItem?.name}
                </span>
              </div>
            </Link>
          );
        })}
      </li>
    </Fragment>
  );
}
