import React, {  useEffect, useState } from "react";
import PrimaryLayout from "../../layouts/PrimaryLayout";
import "../../../Styles/ManualDraw/draw.css";
import Counters from "./Counter";
import axios from "axios";
import { ENDPOINT } from "../../../App/config/endpoint";
import { UnAuth } from "../../../Pages/Auth/UnAuth";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 6;
const ALERT_THRESHOLD = 3;

const COLOR_CODES = {
    info: {
        color: "green",
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD,
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD,
    },
};

const TIME_LIMIT = 10;

const StartManualDraw = () => {
    const [detailsLottery, setDetailsLottery] = useState({});
    const [isSvgClicked, setIsSvgClicked] = useState(false);
    // console.log("isSvgClicked", isSvgClicked);
    const { id } = useParams();
    console.log(id)
    const [drawResult, setDrawResult] = useState(null);
    const [ticketId, setTicketId] = useState("0000000000000000");
    // const [firstPrize, setFirstPrize] = useState("0000000000000000");
    const [secondPrize, setSecondPrize] = useState("0000000000000000");
    // console.log("secondPrize", secondPrize);
    const [thirdPrize, setThirdPrize] = useState("0000000000000000");
    // console.log("thirdPrize", thirdPrize);
    const [timer, setTimer] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [clickedDivs, setClickedDivs] = useState([]);
    console.log("clickedDivs", clickedDivs);
    const [error, setError] = useState(false);

    useEffect(() => {
        const storedClickedDivs = localStorage.getItem(`clickedDivs_${id}`);
        if (storedClickedDivs) {
            setClickedDivs(JSON.parse(storedClickedDivs));
        }
    }, [id]);

    // Save the clickedDivs state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(`clickedDivs_${id}`, JSON.stringify(clickedDivs));
    }, [clickedDivs, id]);

    let timerInterval = null;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    // let remainingPathColor = "green";

    const [remainingPathColor, setRemainingPathColor] = useState(
        COLOR_CODES.info.color
    );

    function remainingPathColors(timeLeft) {
        const { alert, warning } = COLOR_CODES;
        if (timeLeft <= warning.threshold) {
            setRemainingPathColor(warning.color);
        }
        if (timeLeft <= alert.threshold) {
            setRemainingPathColor(alert.color);
        }

        if (timeLeft === 0) {
            setTimer(true);
            document.getElementById("dialer").innerHTML = `
        <div id="main-btn-img" class="base-timer stop-img">
        </div>
        `;
        }
    }

    function startTimer() {
        clearInterval(timerInterval);
        timePassed = 0;
        timeLeft = TIME_LIMIT;
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            document.getElementById("base-timer-label").innerHTML =
                formatTime(timeLeft);
            setCircleDasharray();
            remainingPathColors(timeLeft);

            if (timeLeft === 0) {
                setIsSvgClicked(false);
                onTimesUp();
            }
        }, 1000);
    }

    const handleDivClick = async (divId) => {
        setTimer(false);
        if (
            clickedDivs.length > 0 &&
            clickedDivs[clickedDivs.length - 1] !== divId - 1
        ) {
            return;
        }
        if (divId === 1) {
            await fetchDrawResult();
        }
        let length = clickedDivs.length;
        if (length === 1) {
            setTicketId(secondPrize);
        }
        if (length === 2) {
            setTicketId(thirdPrize);
        }
        if (!error) {
          console.log("object");
            setClickedDivs((prevClickedDivs) => [...prevClickedDivs, divId]);
            // setTicketId("0000000000000000");
        }
    };

    const handleSvgClick = async () => {
        if (!isSvgClicked && clickedDivs.length > 0 && !timer) {
            const element = document.getElementById("main-btn-img");
            element.classList = `base-timer rolling-img`;
            element.innerHTML = `<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g class="base-timer__circle">
                <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                <path
                    id="base-timer-path-remaining"
                    stroke-dasharray="283"
                    class="base-timer__path-remaining ${remainingPathColor}"
                    d="
                    M 50, 50
                    m -45, 0
                    a 45,45 0 1,0 90,0
                    a 45,45 0 1,0 -90,0
                    "
                ></path>
                </g>
            </svg>
            <span id="base-timer-label" style="opacity: 0;" class="base-timer__label"></span>`;
            startTimer();
            setIsSvgClicked(true);
            let count = clickCount + 1;
            setClickCount(count);
        } else {
            toast.error("Please first select a Lottery to draw.");
        }
    };

    useEffect(() => {
        document.getElementById("dialer").innerHTML = `
        <div id="main-btn-img" class="base-timer start-img">
        </div>
        `;
        setRemainingPathColor(COLOR_CODES.info.color);
    }, [clickedDivs]);

    useEffect(() => {
        if (isSvgClicked) {
            const element = document.getElementById(
                "base-timer-path-remaining"
            );
            element.classList = `base-timer__path-remaining ${remainingPathColor}`;
        }
    }, [remainingPathColor]);

    const fetchDrawResult = async () => {
        const token = JSON.parse(localStorage.getItem("authInfo"));
        console.log(token)
        await axios
            .post(
                `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.ticket.drawLottery}${id}`,
                {},
                {
                    headers: {
                        Authorization: "Token " + token.token,
                    },
                }
            )
            .then((result) => {
                console.log("result", result);
                if (result.data.Status == "Error") {
                    setError(true);
                    localStorage.removeItem(`clickedDivs_${id}`);
                    setClickedDivs([]);
                    toast.error(result.data["Message "]);
                } else {
                    setDrawResult(result.data[0]);
                    setTicketId(result.data[0].First_Prize_Winners[0].ticketId);
                    setSecondPrize(
                        result.data[0].Second_Prize_Winners[0].ticketId
                    );
                    setThirdPrize(
                        result.data[0].Third_Prize_Winners[0].ticketId
                    );
                }
            })
            .catch((error) => {
                setError(true);
                console.log("error", error);
                setClickedDivs([]);
                toast.error(error.response.data.message);
            });
    };
    // const fetchDrawResult = async () => {
    //     const token = JSON.parse(localStorage.getItem("authInfo"));
    //     try {
    //         const response = await axios.post(
    //             `${ENDPOINT.ticket.drawLottery}${id}`,
    //             {},
    //             {
    //                 headers: {
    //                     Authorization: "Token " + token.token,
    //                 },
    //             }
    //         );
    //         if (response.data.status === "error") {
    //             setClickedDivs([]);
    //             toast.error(response.data.msg);
    //         } else {
    //             setDrawResult(response.data[0]);
    //             setTicketId(response.data[0].First_Prize_Winners[0].ticketId);
    //             // setFirstPrize(response.data[0].First_Prize_Winners[0].ticketId);
    //             setSecondPrize(
    //                 response.data[0].Second_Prize_Winners[0].ticketId
    //             );
    //             setThirdPrize(response.data[0].Third_Prize_Winners[0].ticketId);
    //         }
    //     } catch (error) {
    //         console.error("error", error);
    //         setClickedDivs([]);
    //         UnAuth(error);
    //     }
    // };

    function onTimesUp() {
        clearInterval(timerInterval);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }

    const getData = async () => {
        const token = JSON.parse(localStorage.getItem("authInfo"));
        try {
            const response = await axios.get(
                `${ENDPOINT.ticket.getDetailTicket}${id}`,
                {
                    headers: {
                        Authorization: "Token " + token.token,
                    },
                }
            );
            if (response.data.status === "error") {
                toast.error(response.data.msg);
            } else {
                setDetailsLottery(response.data);
            }
        } catch (error) {
            console.error("error", error);
            UnAuth(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <PrimaryLayout pageTitle="Lottery Draw">
            <div className="w-full bg-white py-4">
                {/* prizes div  */}
                <div className="grid grid-cols-1 justify-center gap-4 lg:flex lg:flex-row lg:gap-12">
                    <div
                        className={`group relative h-[250px] w-full md:w-[330px] lg:w-[370px] `}
                    >
                        <div
                            className={`flex h-[250px] w-full flex-col items-center justify-center gap-4 rounded-lg hover:border-[3px]  hover:border-[#BDFBFF] hover:bg-white hover:text-[#222] hover:shadow md:w-[330px] lg:w-[370px] ${
                                clickedDivs.includes(1)
                                    ? " border-[3px] border-[#BDFBFF] bg-white text-[#222] shadow "
                                    : " bg-black text-neutral-200 shadow-drawShadow "
                            }`}
                            onClick={() => handleDivClick(1)}
                        >
                            <div className="flex flex-col items-center justify-center gap-4">
                                <p className="text-2xl font-medium leading-[33.60px]">
                                    {detailsLottery?.FirstPrizeName}
                                </p>
                                <div className="relative h-[150px] w-[150px]">
                                    <img
                                        className="absolute left-0 top-0 h-[150px] w-[150px] rounded-full border border-stone-500"
                                        src={detailsLottery?.image_first}
                                        alt=""
                                    />
                                    <div className="absolute left-0 top-[99px] h-[38px] w-[150px]">
                                        <div className="absolute left-[29px] top-[3.37px] text-2xl font-medium leading-[33.60px] text-neutral-800">
                                            1st Prize
                                        </div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="151"
                                            height="38"
                                            viewBox="0 0 151 38"
                                            fill="none"
                                        >
                                            <path
                                                d="M4.5 0L0.5 3H5.5L4.5 0Z"
                                                fill="#806A37"
                                            />
                                            <path
                                                d="M0.5 3H150.5L136.074 34.5183C135.103 36.6396 132.984 38 130.652 38H21.6637C19.4037 38 17.3378 36.7224 16.3282 34.7004L0.5 3Z"
                                                fill="url(#paint0_linear_3590_25715)"
                                            />
                                            <path
                                                d="M146.5 0L150.5 3H145.5L146.5 0Z"
                                                fill="#806A37"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="paint0_linear_3590_25715"
                                                    x1="0.5"
                                                    y1="20.5"
                                                    x2="150.5"
                                                    y2="20.5"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stopColor="#DDB759" />
                                                    <stop
                                                        offset="1"
                                                        stopColor="#9C8443"
                                                    />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="group relative h-[250px] w-full md:w-[330px] lg:w-[370px] ">
                        <div
                            className={`flex h-[250px] w-full flex-col items-center justify-center gap-4 rounded-lg hover:border-[3px]  hover:border-[#BDFBFF] hover:bg-white hover:text-[#222] hover:shadow md:w-[330px] lg:w-[370px] ${
                                clickedDivs.includes(2)
                                    ? " border-[3px] border-[#BDFBFF] bg-white text-[#222] shadow "
                                    : " bg-black text-neutral-200 shadow-drawShadow "
                            }`}
                            onClick={() => handleDivClick(2)}
                        >
                            <div className="flex flex-col items-center justify-center gap-4">
                                <p className="text-2xl font-medium leading-[33.60px]">
                                    {detailsLottery?.SecondPrizeName}
                                </p>
                                <div className="relative h-[150px] w-[150px]">
                                    <img
                                        className="absolute left-0 top-0 h-[150px] w-[150px] rounded-full border border-stone-500"
                                        src={detailsLottery?.image_second}
                                        alt=""
                                    />
                                    <div className="absolute left-0 top-[99px] h-[38px] w-[150px]">
                                        <div className="absolute left-[29px] top-[3.37px] text-2xl font-medium leading-[33.60px] text-neutral-800">
                                            2nd Prize
                                        </div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="151"
                                            height="38"
                                            viewBox="0 0 151 38"
                                            fill="none"
                                        >
                                            <path
                                                d="M4.5 0L0.5 3H5.5L4.5 0Z"
                                                fill="#806A37"
                                            />
                                            <path
                                                d="M0.5 3H150.5L136.074 34.5183C135.103 36.6396 132.984 38 130.652 38H21.6637C19.4037 38 17.3378 36.7224 16.3282 34.7004L0.5 3Z"
                                                fill="url(#paint0_linear_3590_25715)"
                                            />
                                            <path
                                                d="M146.5 0L150.5 3H145.5L146.5 0Z"
                                                fill="#806A37"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="paint0_linear_3590_25715"
                                                    x1="0.5"
                                                    y1="20.5"
                                                    x2="150.5"
                                                    y2="20.5"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stopColor="#DDB759" />
                                                    <stop
                                                        offset="1"
                                                        stopColor="#9C8443"
                                                    />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="group relative h-[250px] w-full md:w-[330px] lg:w-[370px] ">
                        <div
                            className={`flex h-[250px] w-full flex-col items-center justify-center gap-4 rounded-lg hover:border-[3px]  hover:border-[#BDFBFF] hover:bg-white hover:text-[#222] hover:shadow md:w-[330px] lg:w-[370px] ${
                                clickedDivs.includes(3)
                                    ? " border-[3px] border-[#BDFBFF] bg-white text-[#222] shadow "
                                    : " bg-black text-neutral-200 shadow-drawShadow "
                            }`}
                            onClick={() => handleDivClick(3)}
                        >
                            <div className="flex flex-col items-center justify-center gap-4">
                                <p className="text-2xl font-medium leading-[33.60px]">
                                    {detailsLottery?.ThirdPrizeName}
                                </p>
                                <div className="relative h-[150px] w-[150px]">
                                    <img
                                        className="absolute left-0 top-0 h-[150px] w-[150px] rounded-full border border-stone-500"
                                        src={detailsLottery?.image_third}
                                        alt=""
                                    />
                                    <div className="absolute left-0 top-[99px] h-[38px] w-[150px]">
                                        <div className="absolute left-[29px] top-[3.37px] text-2xl font-medium leading-[33.60px] text-neutral-800">
                                            3rd Prize
                                        </div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="151"
                                            height="38"
                                            viewBox="0 0 151 38"
                                            fill="none"
                                        >
                                            <path
                                                d="M4.5 0L0.5 3H5.5L4.5 0Z"
                                                fill="#806A37"
                                            />
                                            <path
                                                d="M0.5 3H150.5L136.074 34.5183C135.103 36.6396 132.984 38 130.652 38H21.6637C19.4037 38 17.3378 36.7224 16.3282 34.7004L0.5 3Z"
                                                fill="url(#paint0_linear_3590_25715)"
                                            />
                                            <path
                                                d="M146.5 0L150.5 3H145.5L146.5 0Z"
                                                fill="#806A37"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="paint0_linear_3590_25715"
                                                    x1="0.5"
                                                    y1="20.5"
                                                    x2="150.5"
                                                    y2="20.5"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stopColor="#DDB759" />
                                                    <stop
                                                        offset="1"
                                                        stopColor="#9C8443"
                                                    />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 1st winner list */}
            <div className="ld:grid-cols-5 my-6 grid grid-cols-1 items-center justify-center gap-6 md:grid-cols-4">
                {drawResult &&
                clickedDivs.length === 1 &&
                timer &&
                clickCount === 1
                    ? drawResult.First_Prize_Winners.map((val, index) => {
                          return (
                              <div className="box" key={index}>
                                  <div className="name_box">
                                      <p>{val?.username}</p>
                                  </div>
                                  <div class="circle-container">
                                      <p class="number">{val?.ticketId}</p>
                                  </div>
                              </div>
                          );
                      })
                    : ""}
            </div>
            {/* 2nd winner list */}
            <div className="ld:grid-cols-5 my-6 grid grid-cols-1 items-center justify-center gap-6 md:grid-cols-4">
                {drawResult &&
                clickedDivs.length === 2 &&
                timer &&
                clickCount === 2
                    ? drawResult.Second_Prize_Winners.map((val, index) => {
                          return (
                              <div className="box" key={index}>
                                  <div className="name_box">
                                      <p>{val?.username}</p>
                                  </div>
                                  <div class="circle-container">
                                      <p class="number">{val?.ticketId}</p>
                                  </div>
                              </div>
                          );
                      })
                    : ""}
            </div>
            {/* 3rd winner list */}
            <div className="ld:grid-cols-5 my-6 grid grid-cols-1 items-center justify-center gap-6 md:grid-cols-4">
                {drawResult &&
                clickedDivs.length === 3 &&
                timer &&
                clickCount === 3
                    ? drawResult.Third_Prize_Winners.map((val, index) => {
                          return (
                              <div className="box" key={index}>
                                  <div className="name_box">
                                      <p>{val?.username}</p>
                                  </div>
                                  <div class="circle-container">
                                      <p class="number">{val?.ticketId}</p>
                                  </div>
                              </div>
                          );
                      })
                    : ""}
            </div>

            <div className="mt-[5%] flex flex-col items-center justify-center gap-5 lg:flex-row lg:gap-8">
                <div id="dialer" onClick={handleSvgClick}></div>
                <Counters
                    totalValue={isSvgClicked && ticketId}
                    duration1={isSvgClicked && TIME_LIMIT}
                />
            </div>
        </PrimaryLayout>
    );
};

export default StartManualDraw;
