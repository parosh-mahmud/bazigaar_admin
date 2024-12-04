import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UnAuth } from "../../Pages/Auth/UnAuth";
import BtnLoader from "../Shared/BtnLoader";
import { ENDPOINT } from "../../App/config/endpoint";
import ImageUploader from "../Shared/ImageUploader";

const CreateNewLottery = ({ setModalOpen, isLoading, setIsLoading, handleData }) => {
  const [image1, setImage1] = useState({});
  const [image2, setImage2] = useState({});
  const [image3, setImage3] = useState({});
  const [image4, setImage4] = useState({});
  const [image5, setImage5] = useState({});

  const [tktTime, setTktTime] = useState({
    openDate: "",
    openTime: "",
    closeDate: "",
    closeTime: "",
  });

  const [lotteryData, setLotteryData] = useState({
    LotteryName: "",
    Price: 0,
    PriceAmount: 0,
    NumberOfWinners: 0,
    NumberOfTickets: 0,
    OpeningTime: "",
    ClosingTime: "",
    FirstPrizeName: "",
    SecondPrizeName: "",
    ThirdPrizeName: "",
    type: "",
    TotalFirstPrizeWinner: 0,
    TotalSecondPrizeWinner: 0,
    TotalThirdPrizeWinner: 0,
    image_first: "",
    image_second: "",
    image_third: "",
    image_banner: "",
    image_prizes: "",
  });

  useEffect(() => {
    if (image1?.type) {
      setLotteryData({ ...lotteryData, image_banner: image1 });
    }
    if (image2?.type) {
      setLotteryData({ ...lotteryData, image_prizes: image2 });
    }
    if (image3?.type) {
      setLotteryData({ ...lotteryData, image_first: image3 });
    }
    if (image4?.type) {
      setLotteryData({ ...lotteryData, image_second: image4 });
    }
    if (image5?.type) {
      setLotteryData({ ...lotteryData, image_third: image5 });
    }
  }, [image1, image2, image3, image4, image5]);

  useEffect(() => {
    let val = tktTime.openDate + "T" + tktTime.openTime;
    setLotteryData({
      ...lotteryData,
      OpeningTime: val,
    });
  }, [tktTime.openDate, tktTime.openTime]);

  useEffect(() => {
    let val = tktTime.closeDate + "T" + tktTime.closeTime;
    setLotteryData({
      ...lotteryData,
      ClosingTime: val,
    });
  }, [tktTime.closeDate, tktTime.closeTime]);

  useEffect(() => {
    setLotteryData({
      ...lotteryData,
      NumberOfWinners:
        Number(lotteryData.TotalFirstPrizeWinner) +
        Number(lotteryData.TotalSecondPrizeWinner) +
        Number(lotteryData.TotalThirdPrizeWinner),
    });
  }, [
    lotteryData.TotalFirstPrizeWinner,
    lotteryData.TotalSecondPrizeWinner,
    lotteryData.TotalThirdPrizeWinner,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem("authInfo"));

    if (token.token) {
      axios
        .post(
          `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.ticket.createTicket}`,
          lotteryData,
          {
            headers: {
              Authorization: "Token " + token.token,
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.status === "error") {
            setIsLoading(false);
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setIsLoading(false);
            handleData();
            setModalOpen(false);
          }
        })
        .catch((e) => {
          UnAuth(e);
          setIsLoading(false);
        });
    }
  };

  return (
    <Fragment>
      <form action="" encType="multipart/form-data">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
          {/* General Information Section */}
          <div className="p-5 border border-gray-300 rounded-lg">
            <div className="pb-4 mb-4 border-b-4 border-gray-500">
              <h2 className="text-3xl font-semibold text-center text-blue-600">General Information</h2>
            </div>
            {/* Lottery Name */}
            <div className="mb-4">
              <p className="pb-2 font-poppins text-base font-semibold text-blackText">Lottery Name:</p>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-400 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="e.g., Mega Jackpot Lottery"
                onChange={(e) => setLotteryData({ ...lotteryData, LotteryName: e.target.value })}
                required
              />
            </div>

            {/* Banner Image */}
            <div className="mb-4">
              <p className="pb-2 font-poppins text-base font-semibold text-blackText">Banner Image:</p>
              <ImageUploader image={image1} setState={setImage1} />
            </div>

            {/* Prize Image */}
            <div className="mb-4">
              <p className="pb-2 font-poppins text-base font-semibold text-blackText">Prize Image:</p>
              <ImageUploader image={image2} setState={setImage2} />
            </div>

            {/* Price */}
            <div className="mb-4">
              <p className="pb-2 font-poppins text-base font-semibold text-blackText">Price:</p>
              <div className="flex items-center">
                <span className="rounded-l-lg border border-black bg-black px-3 py-3 text-base font-semibold text-white">coin</span>
                <input
                  type="number"
                  className="w-full rounded-r-lg border border-gray-400 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="e.g., 5"
                  min={0}
                  onChange={(e) => setLotteryData({ ...lotteryData, Price: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Draw Price Amount */}
            <div className="mb-4">
              <p className="pb-2 font-poppins text-base font-semibold text-blackText">Draw Price Amount:</p>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-400 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="e.g., 1000"
                min={0}
                onChange={(e) => setLotteryData({ ...lotteryData, PriceAmount: e.target.value })}
                required
              />
            </div>

            {/* Total Number of Tickets */}
            <div className="mb-4">
              <p className="pb-2 font-poppins text-base font-semibold text-blackText">Total Number of Tickets:</p>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-400 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="e.g., 500"
                min={0}
                onChange={(e) => setLotteryData({ ...lotteryData, NumberOfTickets: e.target.value })}
                required
              />
            </div>

            {/* Ticket Sell Opening Time */}
            <div className="mb-4">
              <p className="pb-2 font-poppins text-base font-semibold text-blackText">Ticket Sell Opening Time:</p>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-400 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  onChange={(e) => setTktTime({ ...tktTime, openDate: e.target.value })}
                  required
                />
                <input
                  type="time"
                  className="w-full rounded-lg border border-gray-400 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  onChange={(e) => setTktTime({ ...tktTime, openTime: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Ticket Sell Closing Time */}
            <div className="mb-4">
              <p className="pb-2 font-poppins text-base font-semibold text-blackText">Ticket Sell Closing Time:</p>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-400 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  onChange={(e) => setTktTime({ ...tktTime, closeDate: e.target.value })}
                  required
                />
                <input
                  type="time"
                  className="w-full rounded-lg border border-gray-400 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  onChange={(e) => setTktTime({ ...tktTime, closeTime: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Ticket Type */}
            <div className="mb-4">
              <p className="pb-2 font-poppins text-base font-semibold text-blackText">Ticket Type</p>
              <select
                className="w-full rounded-lg border border-gray-400 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                onChange={(e) => setLotteryData({ ...lotteryData, type: e.target.value })}
                required
              >
                <option value="">Select</option>
                <option value="Regular">Regular Lottery</option>
                <option value="Special">Special Lottery</option>
              </select>
            </div>

            {/* Total Number Of Winners */}
            <div className="mb-4">
              <p className="pb-2 font-poppins text-base font-semibold text-blackText">Total Winners:</p>
              <div className="flex items-center justify-center rounded-lg border border-blue-500 bg-blue-100 px-4 py-3">
                <span className="text-2xl font-bold text-blue-700">
                  {Number(lotteryData.TotalFirstPrizeWinner) +
                    Number(lotteryData.TotalSecondPrizeWinner) +
                    Number(lotteryData.TotalThirdPrizeWinner)}
                </span>
              </div>
            </div>
          </div>

          {/* Prizes Section */}
          <div className="p-5 border border-gray-300 rounded-lg">
            <div className="pb-4 mb-4 border-b-4 border-gray-500">
              <h2 className="text-3xl font-semibold text-center text-blue-600">Prizes</h2>
            </div>

            {/* First Prize */}
            <div className="mb-4">
              <h3 className="pb-2 text-1xl font-bold text-center">First Prize</h3>
              <p className="pb-2 font-poppins text-base font-semibold text-blackText">First Prize Name:</p>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-400 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="e.g., Tesla Model S"
                onChange={(e) => setLotteryData({ ...lotteryData, FirstPrizeName: e.target.value })}
                required
              />
              <p className="pb-2 mt-4 font-poppins text-base font-semibold text-blackText">First Prize Image:</p>
              <ImageUploader image={image3} setState={setImage3} />
              <p className="pb-2 mt-4 font-poppins text-base font-semibold text-blackText">Number Of First Prize Winners:</p>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-400 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="e.g., 1"
                min={0}
                onChange={(e) => setLotteryData({ ...lotteryData, TotalFirstPrizeWinner: e.target.value })}
                required
              />
            </div>

            {/* Second Prize */}
            <div className="mb-4">
              <h3 className="pb-2 text-1xl font-bold text-center">Second Prize</h3>
              <p className="pb-2 font-poppins text-base font-semibold text-blackText">Second Prize Name:</p>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-400 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="e.g., MacBook Pro"
                onChange={(e) => setLotteryData({ ...lotteryData, SecondPrizeName: e.target.value })}
                required
              />
              <p className="pb-2 mt-4 font-poppins text-base font-semibold text-blackText">Second Prize Image:</p>
              <ImageUploader image={image4} setState={setImage4} />
              <p className="pb-2 mt-4 font-poppins text-base font-semibold text-blackText">Number Of Second Prize Winners:</p>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-400 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="e.g., 2"
                min={0}
                onChange={(e) => setLotteryData({ ...lotteryData, TotalSecondPrizeWinner: e.target.value })}
                required
              />
            </div>

            {/* Third Prize */}
            <div className="mb-4">
              <h3 className="pb-2 text-1xl font-bold text-center">Third Prize</h3>
              <p className="pb-2 font-poppins text-base font-semibold text-blackText">Third Prize Name:</p>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-400 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="e.g., iPhone 14"
                onChange={(e) => setLotteryData({ ...lotteryData, ThirdPrizeName: e.target.value })}
                required
              />
              <p className="pb-2 mt-4 font-poppins text-base font-semibold text-blackText">Third Prize Image:</p>
              <ImageUploader image={image5} setState={setImage5} />
              <p className="pb-2 mt-4 font-poppins text-base font-semibold text-blackText">Number Of Third Prize Winners:</p>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-400 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="e.g., 5"
                min={0}
                onChange={(e) => setLotteryData({ ...lotteryData, TotalThirdPrizeWinner: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="mt-5 flex items-center justify-end gap-3 lg:gap-5">
          <button
            onClick={() => setModalOpen(false)}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#F56E6E] px-4 py-2 font-poppins text-base font-normal text-white"
          >
            <svg
              style={{ color: "#fff" }}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x cursor-pointer"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>{" "}
            Cancel
          </button>
          {isLoading ? (
            <BtnLoader />
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#63AD6F] px-4 py-2 font-poppins text-base font-normal text-white"
            >
              <svg
                style={{ color: "#fff" }}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-check"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>{" "}
              Confirm
            </button>
          )}
        </div>
      </form>
    </Fragment>
  );
};

export default CreateNewLottery;
