import React, { useEffect, useState, useCallback } from "react";
import PrimaryLayout from "../../layouts/PrimaryLayout";
import "../../../Styles/ManualDraw/draw.css"; // Ensure this has base-timer styles
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
  info: { color: "green" },
  warning: { color: "orange", threshold: WARNING_THRESHOLD },
  alert: { color: "red", threshold: ALERT_THRESHOLD },
};

const TIME_LIMIT = 10; // Draw time in seconds

const StartManualDraw = () => {
  const { id } = useParams(); // Lottery ID

  const [detailsLottery, setDetailsLottery] = useState({});
  const [drawResult, setDrawResult] = useState(null);
  const [ticketId, setTicketId] = useState("0000000000000000");

  const [isSvgClicked, setIsSvgClicked] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [drawInitiated, setDrawInitiated] = useState(false);

  const [showFirstWinners, setShowFirstWinners] = useState(false);
  const [showSecondWinners, setShowSecondWinners] = useState(false);
  const [showThirdWinners, setShowThirdWinners] = useState(false);

  const [remainingPathColor, setRemainingPathColor] = useState(COLOR_CODES.info.color);

  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  }, []);

  const updateDialerContent = useCallback((type) => {
    const dialerElement = document.getElementById("dialer");
    if (!dialerElement) return;

    if (type === "start") {
      dialerElement.innerHTML = `<div id="main-btn-img" class="base-timer start-img"></div>`;
      setRemainingPathColor(COLOR_CODES.info.color);
    } else if (type === "rolling") {
      dialerElement.innerHTML = `
        <div id="main-btn-img" class="base-timer rolling-img">
          <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g class="base-timer__circle">
              <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
              <path
                id="base-timer-path-remaining"
                stroke-dasharray="${FULL_DASH_ARRAY}"
                class="base-timer__path-remaining ${remainingPathColor}"
                d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
              ></path>
            </g>
          </svg>
          <span id="base-timer-label" class="base-timer__label">${formatTime(TIME_LIMIT)}</span>
        </div>`;
    } else if (type === "stop") {
      dialerElement.innerHTML = `<div id="main-btn-img" class="base-timer stop-img"></div>`;
    }
  }, [remainingPathColor, formatTime]);

  useEffect(() => {
    if (!isSvgClicked) {
      updateDialerContent(timerActive ? "stop" : "start");
    }
  }, [isSvgClicked, timerActive, updateDialerContent]);

  useEffect(() => {
    if (isSvgClicked) {
      const pathElement = document.getElementById("base-timer-path-remaining");
      if (pathElement) {
        pathElement.classList.remove(COLOR_CODES.info.color, COLOR_CODES.warning.color, COLOR_CODES.alert.color);
        pathElement.classList.add(remainingPathColor);
      }
    }
  }, [remainingPathColor, isSvgClicked]);

  const startTimer = useCallback(() => {
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    
    updateDialerContent("rolling"); 

    const timerInterval = setInterval(() => {
      timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;

      const labelElement = document.getElementById("base-timer-label");
      if (labelElement) labelElement.innerHTML = formatTime(timeLeft);
      
      const rawTimeFraction = timeLeft / TIME_LIMIT;
      const timeFraction = rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
      const circleDasharray = `${(timeFraction * FULL_DASH_ARRAY).toFixed(0)} ${FULL_DASH_ARRAY}`;
      const pathElement = document.getElementById("base-timer-path-remaining");
      if (pathElement) pathElement.setAttribute("stroke-dasharray", circleDasharray);

      const { alert, warning } = COLOR_CODES;
      if (timeLeft <= alert.threshold) setRemainingPathColor(alert.color);
      else if (timeLeft <= warning.threshold) setRemainingPathColor(warning.color);
      else setRemainingPathColor(COLOR_CODES.info.color);

      if (timeLeft === 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
    return timerInterval;
  }, [formatTime, updateDialerContent]);

  const fetchDrawResult = async () => {
    const tokenInfo = localStorage.getItem("authInfo");
    if (!tokenInfo) {
      toast.error("Authentication token not found. Please log in.");
      UnAuth(); 
      setIsSvgClicked(false); // Ensure UI resets if unauth occurs early
      setTimerActive(true);  // Or false, depending on desired state after auth error
      return;
    }
    const token = JSON.parse(tokenInfo).token;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.ticket.drawLottery}${id}`,
        {},
        { headers: { Authorization: "Token " + token } }
      );

      // API returns the draw result object directly in response.data
      if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
        const resultData = response.data;

        // Check for application-level error status if your API includes it in the response object
        // e.g. if (resultData.status === "error" || resultData.Status === "Error")
        // For now, we'll rely on a key property like 'lottery_id' to validate successful structure.
        // The initial code also checked for `result.data.Status == "Error"`
        // Let's assume if those fields are present, it's an error payload.

        if (resultData.Status === "Error" || resultData.status === "error") {
             setApiError(true);
             toast.error(resultData["Message "] || resultData.msg || "An error occurred in draw results.");
             setDrawResult(null);
        } else if (resultData.lottery_id) { // Check for a key property to confirm it's the draw data
            setDrawResult(resultData);
            setTicketId(resultData.first_prize_winners?.[0]?.ticketId || "0000000000000000");
            setApiError(false);
        } else {
            // It's an object, but not an error structure we explicitly checked,
            // and not the draw data structure we expected (missing lottery_id).
            setApiError(true);
            toast.error("Received an object, but it's not the expected draw result format.");
            setDrawResult(null);
        }
      } else {
        // response.data is not an object, or it's null/undefined
        setApiError(true);
        toast.error("Unexpected response structure from draw API. Expected a JSON object.");
        setDrawResult(null);
      }
    } catch (error) {
      setApiError(true);
      setDrawResult(null);
      console.error("Error fetching draw result:", error);
      toast.error(error.response?.data?.message || "Failed to fetch draw result.");
      if (error.response?.status === 401) UnAuth(error);
    } finally {
        setIsSvgClicked(false); 
        setTimerActive(true);   
    }
  };

  const fetchLotteryDetails = useCallback(async () => {
    const tokenInfo = localStorage.getItem("authInfo");
    if (!tokenInfo) return; 
    const token = JSON.parse(tokenInfo).token;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.ticket.getDetailTicket}${id}`,
        { headers: { Authorization: "Token " + token } }
      );
      if (response.data && response.data.status !== "error") {
        setDetailsLottery(response.data);
      }
    } catch (error) {
      console.warn("Could not fetch lottery details:", error.message);
      if (error.response?.status === 401) UnAuth(error);
    }
  }, [id]);

  useEffect(() => {
    fetchLotteryDetails();
  }, [fetchLotteryDetails]);

  const handleSvgClick = async () => {
    if (isSvgClicked) {
      toast.error("Draw is already in progress.");
      return;
    }
    if (drawInitiated && timerActive && !apiError) { // If draw was successful already
        toast.info("Draw already completed. You can view winners or refresh to try again (if applicable).");
        return;
    }
    // Allow re-try if previous attempt had an API error
    // if (drawInitiated && timerActive && apiError) {
    //   toast.info("Previous draw attempt failed. Retrying...");
    // }


    setIsSvgClicked(true);
    setTimerActive(false); 
    setDrawInitiated(true);
    setApiError(false); 
    
    setShowFirstWinners(false);
    setShowSecondWinners(false);
    setShowThirdWinners(false);
    setDrawResult(null); 
    setTicketId("DRAWING..."); 

    startTimer();
    await fetchDrawResult(); 
  };

  const getDialerPrompt = () => {
    if (isSvgClicked) return "Draw in progress...";
    if (timerActive && !apiError && drawResult) return `Draw Complete for ${drawResult.lottery_name}!`;
    if (timerActive && apiError) return "Error occurred during draw. Please try again.";
    if (drawInitiated) return "Preparing for draw..."; // This state might be very brief
    return "Click the dialer to start the draw!";
  };

  const WinnerList = ({ winners, prizeTitle }) => {
    if (!winners || winners.length === 0) {
      return <p className="text-center text-gray-500 py-4">No winners announced for this prize.</p>;
    }
    return (
      <div className="mb-8 p-4 sm:p-6 bg-white rounded-lg shadow-lg border-l-4 border-sky-400">
        <h3 className="text-xl font-semibold mb-4 text-sky-600">{prizeTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {winners.map((winner, index) => (
            <div className="p-3 bg-sky-50 rounded-md shadow-sm border border-sky-200" key={`${prizeTitle}-${index}`}>
              <p className="font-semibold text-sky-700 truncate" title={winner?.username}>{winner?.username || "N/A"}</p>
              <p className="text-sm text-neutral-600">{winner?.ticketId}</p>
              <p className="text-xs text-neutral-500 truncate" title={winner?.prizeName}>{winner?.prizeName}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const pageTitle = drawResult?.lottery_name || detailsLottery?.name || "Lottery Draw";

  return (
    <PrimaryLayout pageTitle={pageTitle}>
      <div className="container mx-auto p-4 md:p-6 lg:p-8 font-sans antialiased text-gray-800">
        
        <section id="draw-controls" className="my-10 py-8 bg-gradient-to-br from-slate-800 to-neutral-900 rounded-xl shadow-2xl">
          <h3 className="text-lg sm:text-xl font-medium text-center mb-6 text-neutral-300">
            {getDialerPrompt()}
          </h3>
          {timerActive && apiError && <p className="text-center text-red-400 mb-4">An API error occurred. Please try clicking the dialer again.</p>}

          <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-12">
            <div 
              id="dialer" 
              onClick={handleSvgClick} 
              className={`${isSvgClicked || (timerActive && !apiError && drawResult) ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
              title={isSvgClicked ? 'Draw in progress' : ((timerActive && !apiError && drawResult) ? 'Draw complete' : 'Click to start draw')}
            >
              {/* Dialer SVG/Image is injected by useEffects via updateDialerContent */}
            </div>
            <div className="w-full max-w-md lg:max-w-sm px-4">
                 <Counters
                    totalValue={ticketId} 
                    duration1={(isSvgClicked) ? TIME_LIMIT : 0}
                />
            </div>
          </div>
        </section>

        {drawInitiated && timerActive && !apiError && drawResult && (
            <section id="view-winners-buttons" className="my-10 text-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button 
                    onClick={() => setShowFirstWinners(s => !s)}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105"
                >
                    {showFirstWinners ? "Hide" : "View"} 1st Prize Winners ({drawResult.first_prize_winners?.length || 0})
                </button>
                <button 
                    onClick={() => setShowSecondWinners(s => !s)}
                    className="w-full sm:w-auto px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105"
                >
                    {showSecondWinners ? "Hide" : "View"} 2nd Prize Winners ({drawResult.second_prize_winners?.length || 0})
                </button>
                <button 
                    onClick={() => setShowThirdWinners(s => !s)}
                    className="w-full sm:w-auto px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105"
                >
                    {showThirdWinners ? "Hide" : "View"} 3rd Prize Winners ({drawResult.third_prize_winners?.length || 0})
                </button>
            </section>
        )}

        {drawInitiated && timerActive && !apiError && drawResult && (
          <section id="winners-display" className="mt-12">
            {showFirstWinners && (
                <WinnerList winners={drawResult.first_prize_winners} prizeTitle="1st Prize Winners" />
            )}
            {showSecondWinners && (
                <WinnerList winners={drawResult.second_prize_winners} prizeTitle="2nd Prize Winners" />
            )}
            {showThirdWinners && (
                <WinnerList winners={drawResult.third_prize_winners} prizeTitle="3rd Prize Winners" />
            )}
          </section>
        )}
         {timerActive && !apiError && !drawResult && (
            <p className="text-center text-gray-500 my-10">Draw process completed, but no winner data was found in the response.</p>
        )}
      </div>
    </PrimaryLayout>
  );
};

export default StartManualDraw;