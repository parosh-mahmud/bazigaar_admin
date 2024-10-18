import React, { Fragment } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CardSkeleton from "../Shared/CardSkeleton";
import { ActiveUserIcon, NewUserIcon, TotalEventIcon, TotalOrderIcon, TotalPaymentPendingIcon, TotalPaymentReceivedIcon, TotalProductIcon, TotalSiteVisitorIcon, TotalUserIcon } from "../../Assets/locales/DashboardIcons";
// import  "../../Styles/Card.scss";
const Cards = ({ data }) => {
  const progressPercentage = 80;

  return (
    <Fragment>
      <div>
        {/* top section  */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8 2xl:grid-cols-4">
          {data?.HeaderData?.length > 0 ? (
            data?.HeaderData?.map((headData, i) => {
              return (
                <div
                  key={i}
                  className="flex w-full items-center justify-between gap-3 rounded-lg p-[22px] shadow-cardShadow lg:p-[32px]">
                  <div className="flex h-full flex-col justify-between">
                    <h1 className="font-inter text-xl font-semibold text-blackText md:text-2xl lg:text-3xl">
                      ${headData?.value}
                    </h1>
                    <p className="font-poppins text-lg font-medium text-blackText">
                      {headData?.name}
                    </p>
                  </div>

                  <div
                    style={{
                      height: "80px",
                      width: "80px",
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                      fill="none">
                      <path
                        d="M26.6667 38C26.6667 40.5667 28.6667 42.6667 31.1 42.6667H36.1C38.2333 42.6667 39.9667 40.8333 39.9667 38.6C39.9667 36.1667 38.9 35.3 37.3333 34.7333L29.3333 31.9333C27.7333 31.3667 26.6667 30.5 26.6667 28.0667C26.6667 25.8333 28.4 24 30.5333 24H35.5333C38 24.0333 40 26.1 40 28.6667"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M33.3333 42.8333V45.3"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M33.3333 21.3666V23.9666"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M33.3 59.9334C48.0092 59.9334 59.9333 48.0092 59.9333 33.3C59.9333 18.5908 48.0092 6.66669 33.3 6.66669C18.5908 6.66669 6.66666 18.5908 6.66666 33.3C6.66666 48.0092 18.5908 59.9334 33.3 59.9334Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M43.2667 66.2666C46.2667 70.5 51.1667 73.2666 56.7667 73.2666C65.8667 73.2666 73.2667 65.8666 73.2667 56.7666C73.2667 51.2333 70.5333 46.3333 66.3667 43.3333"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              );
            })
          ) : (
            <CardSkeleton />
          )}
        </div>

        {/* middle section  */}
        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 md:gap-6 md:py-6 lg:grid-cols-3 lg:gap-8 lg:py-8 2xl:grid-cols-4">
          {data?.EarningData?.length > 0 ? (
            data?.EarningData?.map((earnData, i) => {
              return (
                <div
                  key={i}
                  className="flex w-full items-center justify-between gap-3 rounded-lg p-[22px] shadow-cardShadow lg:gap-8 lg:p-[32px]">
                  <div className="flex h-full flex-col justify-between">
                    <h1 className="font-inter text-xl font-semibold text-blackText md:text-2xl lg:text-3xl">
                      ${earnData?.value}
                    </h1>
                    <p className="font- pt-1 font-poppins text-lg font-medium text-blackText">
                      {earnData?.name}
                    </p>
                  </div>

                  <div
                    style={{
                      height: "80px",
                      width: "80px",
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                      fill="none">
                      <path
                        d="M31.6654 45.8334C31.6654 49.0668 34.1655 51.6668 37.2321 51.6668H43.4987C46.1654 51.6668 48.3321 49.4001 48.3321 46.5668C48.3321 43.5334 46.9988 42.4334 45.0321 41.7334L34.9987 38.2334C33.0321 37.5334 31.6988 36.4668 31.6988 33.4001C31.6988 30.6001 33.8654 28.3001 36.532 28.3001H42.7987C45.8654 28.3001 48.3654 30.9001 48.3654 34.1334"
                        stroke="black"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M39.9999 25V55"
                        stroke="black"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M73.3321 40.0006C73.3321 58.4006 58.3988 73.3339 39.9988 73.3339C21.5988 73.3339 6.66547 58.4006 6.66547 40.0006C6.66547 21.6006 21.5988 6.6673 39.9988 6.6673"
                        stroke="black"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M73.3333 20.0006V6.6673H60"
                        stroke="black"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M56.6655 23.334L73.3321 6.6673"
                        stroke="black"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              );
            })
          ) : (
            <CardSkeleton />
          )}
        </div>
      </div>

      {/* end section  */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8 2xl:grid-cols-4">
        {data?.UserData?.length > 0 ? (
          data?.UserData?.map((userData, i) => {
            return (
              <div
                key={i}
                className="group flex w-full items-center justify-between gap-3 rounded-lg bg-white p-[22px] shadow-cardShadow hover:bg-black lg:p-[32px]">
                <div className="flex w-full items-center justify-between gap-3">
                  <div className="flex h-full flex-col justify-between">
                    <h1 className="font-inter text-xl font-semibold text-blackText group-hover:text-white md:text-2xl lg:text-3xl">
                      {userData?.name === "Payment Received"
                        ? "$" + userData?.value
                        : userData?.value}
                    </h1>
                    <p className="font- pt-1 font-poppins text-lg font-medium text-blackText group-hover:text-white">
                      {userData?.name}
                    </p>
                  </div>

                  <div
                    style={{
                      height: "80px",
                      width: "80px",
                    }}>
                    {userData?.name === "Total Users" ? (
                      <TotalUserIcon />
                    ) : userData?.name === "Total Active Users" ? (
                      <ActiveUserIcon />
                    ) : userData?.name === "New User" ? (
                      <NewUserIcon />
                    ) : userData?.name === "Total Products" ? (
                      <TotalProductIcon />
                    ) : userData?.name === "Total Site Visitors" ? (
                      <TotalSiteVisitorIcon />
                    ) : userData?.name === "Orders Received" ? (
                      <TotalOrderIcon />
                    ) : userData?.name === "Total Events" ? (
                      <TotalEventIcon />
                    ) : userData?.name === "Orders Pending" ? (
                      <TotalPaymentPendingIcon />
                    ) : userData?.name === "Payment Received" ? (
                      <TotalPaymentReceivedIcon />
                    ) : (
                      <TotalUserIcon />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <CardSkeleton />
        )}
      </div>
    </Fragment>
  );
};

export default Cards;
