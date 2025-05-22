import React, { Fragment, useState, useEffect } from "react";
import PrimaryLayout from "../../Component/layouts/PrimaryLayout";
import { CartIcon, ClockIcon } from "../../Assets/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../../App/config/endpoint";
import { UnAuth } from "../Auth/UnAuth";
import { toast } from "react-hot-toast";

const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours}h:${minutes.toString().padStart(2, "0")}m:${seconds
        .toString()
        .padStart(2, "0")}s`;
};

const Lottery = () => {

    const [lotteries, setLotteries] = useState([]);
    // console.log("allLottery", allLottery);

    // useEffect(() => {
    //     if (allLottery.length > 0) {
    //         setRemainingTime(allLottery[0].remaining_time_seconds);
    //     }
    // }, [allLottery]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setRemainingTime((prevTime) => Math.max(0, prevTime - 1));
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);

    const getData = async () => {
        const token = JSON.parse(localStorage.getItem("authInfo"));
        try {
            const response = await axios.get(
              `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.ticket.getTicket}`,
              {
                headers: {
                  Authorization: "Token " + token.token,
                },
              }
            );
            if (response.data.status === "error") {
                toast.error(response.data.msg);
            } else {
                setLotteries(response.data);
            }
        } catch (error) {
            console.error("error", error);
            UnAuth(error);
        }
    };

    useEffect(() => {
        getData();
        const interval = setInterval(() => {
            setLotteries((prevLotteries) => {
                return prevLotteries.map((lottery) => {
                    return {
                        ...lottery,
                        remaining_time_seconds: Math.max(
                            0,
                            lottery.remaining_time_seconds - 1
                        ),
                    };
                });
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const renderLotteryStatus = (lottery) => {
        if (lottery.isDrawComplete) {
            return (
                <div className="flex w-full items-center justify-between rounded-md border bg-green-600 p-4 text-white shadow-md lg:w-[350px]">
                    <span className="text-xl font-bold">Draw Completed</span>
                    <span className="flex items-center justify-center rounded-full bg-white p-2">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 text-green-600" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M5 13l4 4L19 7" 
                            />
                        </svg>
                    </span>
                </div>
            );
        }

        return (
            <div className="flex w-full items-center justify-between rounded-md border p-4 shadow-md lg:w-[350px]">
                <span className="text-xl font-bold">
                    {formatTime(lottery.remaining_time_seconds)}
                </span>
                <span className="">
                    <ClockIcon />
                </span>
            </div>
        );
    };

    return (
        <Fragment>
            <PrimaryLayout pageTitle="Manual Draw">
                <div className="mt-6 w-full rounded-[6px] shadow-md lg:mt-10 lg:rounded-[8px]">
                    <div className="w-full rounded-t-[6px] bg-[#F1F3F7] p-3 text-xl font-medium lg:rounded-t-[8px] lg:p-4">
                        Select A Lottery To Draw
                    </div>
                    <div className="w-full rounded-b-[6px] bg-white p-3 lg:rounded-b-[8px] lg:p-5">
                        {lotteries.map((lottery, index) => (
                            <div
                                className="mb-4 grid w-full grid-cols-1 gap-8 last:mb-0 lg:w-fit lg:grid-cols-2 lg:gap-24"
                                key={index}
                            >
                                <Link
                                    to={`/manage-lottery/package/${lottery?.LotteryId}`}
                                    className="flex w-full items-center justify-between rounded-md border bg-black p-4 text-white shadow-md lg:w-[350px]"
                                >
                                    <span className="text-xl font-bold">
                                        {lottery?.LotteryName}
                                    </span>
                                    <div>
                                        <span className="flex items-center justify-center rounded-full bg-[#D3AC46] p-3">
                                            <CartIcon />
                                        </span>
                                    </div>
                                </Link>
                                {renderLotteryStatus(lottery)}
                            </div>
                        ))}
                    </div>
                </div>
            </PrimaryLayout>
        </Fragment>
    );
};

export default Lottery;
