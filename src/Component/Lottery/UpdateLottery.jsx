// import React, { Fragment, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { UnAuth } from "../../Pages/Auth/UnAuth";
// import BtnLoader from "../Shared/BtnLoader";
// import { ENDPOINT } from "../../App/config/endpoint";
// import ImageUploader from "../Shared/ImageUploader";
// const UpdateLottery = ({
//   setModalOpen,
//   isLoading,
//   setIsLoading,
//   id,
//   handleData,
// }) => {
//   const [data, setData] = useState({});
//   // console.log(data);
//   const token = JSON.parse(localStorage.getItem("authInfo"));
//   useEffect(() => {
//     axios
//       .get(
//         `${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.ticket?.getDetailTicket}${id}`,
//         {
//           headers: {
//             Authorization: "Token " + token.token,
//           },
//         }
//       )
//       .then((res) => {
//         if (res.data.status === "error") {
//           toast.error(res.data.message);
//         } else {
//           setData(res.data);
//           console.log("Res",res.data);
//         }
//       })
//       .catch((e) => {
//         // console.log(e);
//         UnAuth(e);
//       });
//   }, [id]);
// console.log("data", data);
//   const [image1, setImage1] = useState("");
//   const [image2, setImage2] = useState("");
//   const [image3, setImage3] = useState("");
//   const [image4, setImage4] = useState("");
//   const [image5, setImage5] = useState("");
//   const [totalWinner, setTotalWinner] = useState(0);
//   console.log("totalWinner", totalWinner);

//   useEffect(() => {
//     setImage1({ img: data.image_banner });
//     setImage2({ img: data.image_prizes });
//     setImage3({ img: data.image_first });
//     setImage4({ img: data.image_second });
//     setImage5({ img: data.image_third });
//     // setTotalWinner(data.NumberOfWinners);
//   }, [data]);

//   const [tktTime, setTktTime] = useState({
//     openDate: "",
//     openTime: "",
//     closeDate: "",
//     closeTime: "",
//   });

//   const [lotteryData, setLotteryData] = useState({});
  

//   useEffect(() => {
//     setLotteryData({
//       LotteryName: data?.LotteryName,
//       Price: data?.Price,
//       PriceAmount: data?.PriceAmount,
//       NumberOfWinners: Number(data?.NumberOfWinners),
//       NumberOfTickets: data?.NumberOfTickets,
//       OpeningTime: data?.OpeningTime,
//       ClosingTime: data?.ClosingTime,
//       FirstPrizeName: data?.FirstPrizeName,
//       SecondPrizeName: data?.SecondPrizeName,
//       ThirdPrizeName: data?.ThirdPrizeName,
//       TotalFirstPrizeWinner: data?.TotalFirstPrizeWinner,
//       TotalSecondPrizeWinner: data?.TotalSecondPrizeWinner,
//       TotalThirdPrizeWinner: data?.TotalThirdPrizeWinner,
//       image_first: data?.image_first,
//       image_second: data?.image_second,
//       image_third: data?.image_third,
//       image_banner: data?.image_banner,
//       image_prizes: data?.image_prizes,
//     });
//   }, [data]);

//   useEffect(() => {
//     setTotalWinner(
//       parseInt(lotteryData?.TotalFirstPrizeWinner) +
//         parseInt(lotteryData?.TotalSecondPrizeWinner) +
//         parseInt(lotteryData?.TotalThirdPrizeWinner)
//     );
//   }, [lotteryData]);

//   useEffect(() => {
//     if (image1?.type) {
//       setLotteryData({ ...lotteryData, image_banner: image1 });
//     }
//     if (image2?.type) {
//       setLotteryData({ ...lotteryData, image_prizes: image2 });
//     }
//     if (image3?.type) {
//       setLotteryData({ ...lotteryData, image_first: image3 });
//     }
//     if (image4?.type) {
//       setLotteryData({ ...lotteryData, image_second: image4 });
//     }
//     if (image5?.type) {
//       setLotteryData({ ...lotteryData, image_third: image5 });
//     }
//   }, [image1, image2, image3, image4, image5]);

//   useEffect(() => {
//     let val = tktTime.openDate + "T" + tktTime.openTime;
//     setLotteryData({
//       ...lotteryData,
//       OpeningTime: val,
//     });
//   }, [tktTime.openDate, tktTime.openTime]);

//   useEffect(() => {
//     let val = tktTime.closeDate + "T" + tktTime.closeTime;
//     setLotteryData({
//       ...lotteryData,
//       ClosingTime: val,
//     });
//   }, [tktTime.closeDate, tktTime.closeTime]);

//   useEffect(() => {
//     setLotteryData({
//       ...lotteryData,
//       NumberOfWinners:
//         Number(lotteryData.TotalFirstPrizeWinner) +
//         Number(lotteryData.TotalSecondPrizeWinner) +
//         Number(lotteryData.TotalThirdPrizeWinner),
//     });
//   }, [
//     lotteryData.TotalFirstPrizeWinner,
//     lotteryData.TotalSecondPrizeWinner,
//     lotteryData.TotalThirdPrizeWinner,
//   ]);

//   const handleSubmit = (e) => {
//     setIsLoading(true);
//     e.preventDefault();
    
//     const token = JSON.parse(localStorage.getItem("authInfo"));

//     if (token.token) {
//       const updatedData = {};

//       Object.keys(lotteryData).forEach((key) => {
//         // Check if the value has changed
//         if (lotteryData[key] !== data[key]) {
//           updatedData[key] = lotteryData[key];
//         }
//       });
//       axios
//         .post(
//           `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.ticket.updateTicket}${id}`,
//           updatedData,
//           {
//             headers: {
//               Authorization: "Token " + token.token,
//               "content-type": "multipart/form-data",
//             },
//           }
//         )
//         .then((res) => {
//           console.log("datas", res);
//           if (res.data.status === "error") {
//             toast.error(res.data.message);
//           } else {
//             console.log("res", res);
//             toast.success(res.data.message);
//             handleData();
//             setModalOpen(false);
//             setIsLoading(false);
//           }
//         })
//         .catch((e) => {
//           // console.log(e);
//           UnAuth(e);
//           setIsLoading(false);
//         });
//     }
//   };
// console.log("lotteryData", lotteryData);

//   return (
//     <Fragment>
//       <form action="" encType="multipart/form-data">
//         <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
//           {/* section 1 */}
//           <div>
//             {/* Banner Image */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Banner Image:
//               </p>
//               <ImageUploader image={image1} setState={setImage1} />
//             </div>
//             {/* Prize Image */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Prize Image:
//               </p>
//               <ImageUploader image={image2} setState={setImage2} />
//             </div>
//             {/* Lottery Name */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Lottery Name:
//               </p>
//               <input
//                 type="text"
//                 className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                 defaultValue={data?.LotteryName}
//                 onChange={(e) => {
//                   setLotteryData({
//                     ...lotteryData,
//                     LotteryName: e.target.value,
//                   });
//                 }}
//                 required={true}
//               />
//             </div>
//             {/* Price: */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Price:
//               </p>
//               <div className=" flex items-center">
//                 <p className="mb-4 rounded-l-lg border border-black bg-black px-3 py-3 text-base font-semibold text-white">
//                   $
//                 </p>
//                 <input
//                   min={0}
//                   type="number"
//                   className="mb-4 w-full rounded-r-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                   defaultValue={data?.Price}
//                   onChange={(e) => {
//                     setLotteryData({
//                       ...lotteryData,
//                       Price: e.target.value,
//                     });
//                   }}
//                   required={true}
//                 />
//               </div>
//             </div>

//             {/* Draw Price Amount: */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Draw Price Amount:
//               </p>
//               <input
//                 min={0}
//                 type="number"
//                 className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                 defaultValue={data?.PriceAmount}
//                 onChange={(e) => {
//                   setLotteryData({
//                     ...lotteryData,
//                     PriceAmount: e.target.value,
//                   });
//                 }}
//                 required={true}
//               />
//             </div>

//             {/* Total Number of Tickets: */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Total Number of Tickets:
//               </p>
//               <input
//                 min={0}
//                 type="number"
//                 className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                 defaultValue={data?.NumberOfTickets}
//                 onChange={(e) => {
//                   setLotteryData({
//                     ...lotteryData,
//                     NumberOfTickets: e.target.value,
//                   });
//                 }}
//                 required={true}
//               />
//             </div>
//             {/* Ticket Sell Opening Time */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Ticket Sell Opening Time:
//               </p>

//               <div className="mb-4 grid w-full grid-cols-1 gap-3 rounded-lg border border-gray-400 px-4 py-3 lg:grid-cols-2">
//                 <div className="flex items-center">
//                   <p className="pr-2 font-poppins text-base font-normal  text-blackText">
//                     Date:
//                   </p>
//                   <input
//                     type="date"
//                     className="w-full rounded-lg border border-gray-400 p-2  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                     defaultValue={data?.OpeningTime}
//                     onChange={(e) => {
//                       setTktTime({
//                         ...tktTime,
//                         openDate: e.target.value,
//                       });
//                     }}
//                     required={true}
//                   />
//                 </div>
//                 <div className="flex items-center">
//                   <p className="pr-2 font-poppins text-base font-normal text-blackText">
//                     Time:
//                   </p>
//                   <input
//                     type="time"
//                     className="w-full rounded-lg border border-gray-400 p-2  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                     defaultValue={data?.OpeningTime}
//                     onChange={(e) => {
//                       setTktTime({
//                         ...tktTime,
//                         openTime: e.target.value,
//                       });
//                     }}
//                     required={true}
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* Ticket Sell Closing Time */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Ticket Sell Closing Time:
//               </p>

//               <div className="mb-4 grid w-full grid-cols-1 gap-3 rounded-lg border border-gray-400 px-4 py-3 lg:grid-cols-2">
//                 <div className="flex items-center">
//                   <p className="pr-2 font-poppins text-base font-normal  text-blackText">
//                     Date:
//                   </p>
//                   <input
//                     type="date"
//                     className="w-full rounded-lg border border-gray-400 p-2  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                     defaultValue={data?.ClosingTime}
//                     onChange={(e) => {
//                       setTktTime({
//                         ...tktTime,
//                         closeDate: e.target.value,
//                       });
//                     }}
//                     required={true}
//                   />
//                 </div>
//                 <div className="flex items-center">
//                   <p className="pr-2 font-poppins text-base font-normal text-blackText">
//                     Time:
//                   </p>
//                   <input
//                     type="time"
//                     className="w-full rounded-lg border border-gray-400 p-2  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                     defaultValue={data?.ClosingTime}
//                     onChange={(e) => {
//                       setTktTime({
//                         ...tktTime,
//                         closeTime: e.target.value,
//                       });
//                     }}
//                     required={true}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* First Prize Image: */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 First Prize Image:
//               </p>
//               <ImageUploader image={image3} setState={setImage3} />
//             </div>
//           </div>
//           {/* section 2 */}
//           <div>
//             {/* First Prize Name */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 First Prize Name:
//               </p>
//               <input
//                 type="text"
//                 className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                 defaultValue={data?.FirstPrizeName}
//                 onChange={(e) => {
//                   setLotteryData({
//                     ...lotteryData,
//                     FirstPrizeName: e.target.value,
//                   });
//                 }}
//                 required={true}
//               />
//             </div>
//             {/* Second Prize Image: */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Second Prize Image:
//               </p>
//               <ImageUploader image={image4} setState={setImage4} />
//             </div>
//             {/* Second Prize Name */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Second Prize Name:
//               </p>
//               <input
//                 type="text"
//                 className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                 defaultValue={data?.SecondPrizeName}
//                 onChange={(e) => {
//                   setLotteryData({
//                     ...lotteryData,
//                     SecondPrizeName: e.target.value,
//                   });
//                 }}
//                 required={true}
//               />
//             </div>
//             {/* Third Prize Image: */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Third Prize Image:
//               </p>
//               <ImageUploader image={image5} setState={setImage5} />
//             </div>
//             {/* Third Prize Name */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Third Prize Name:
//               </p>
//               <input
//                 type="text"
//                 className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                 defaultValue={data?.ThirdPrizeName}
//                 onChange={(e) => {
//                   setLotteryData({
//                     ...lotteryData,
//                     ThirdPrizeName: e.target.value,
//                   });
//                 }}
//                 required={true}
//               />
//             </div>
//             {/* Number Of Frist Winner */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Number Of Frist Winner:
//               </p>
//               <input
//                 min={0}
//                 type="number"
//                 className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                 defaultValue={data?.TotalFirstPrizeWinner}
//                 onChange={(e) => {
//                   setLotteryData({
//                     ...lotteryData,
//                     TotalFirstPrizeWinner: e.target.value,
//                   });
//                 }}
//                 required={true}
//               />
//             </div>
//             {/* Number Of Second Winner */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Number Of Second Winner:
//               </p>
//               <input
//                 min={0}
//                 type="number"
//                 className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                 defaultValue={data?.TotalSecondPrizeWinner}
//                 onChange={(e) => {
//                   setLotteryData({
//                     ...lotteryData,
//                     TotalSecondPrizeWinner: e.target.value,
//                   });
//                 }}
//                 required={true}
//               />
//             </div>
//             {/* Number Of Third Winner */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Number Of Third Winner:
//               </p>
//               <input
//                 min={0}
//                 type="number"
//                 className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                 defaultValue={data?.TotalThirdPrizeWinner}
//                 onChange={(e) => {
//                   setLotteryData({
//                     ...lotteryData,
//                     TotalThirdPrizeWinner: e.target.value,
//                   });
//                 }}
//                 required={true}
//               />
//             </div>
//             {/* Number Of Winner: */}
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Number Of Winner:
//               </p>
//               <input
//                 disabled={true}
//                 type="number"
//                 className="mb-2 w-full rounded-lg border border-gray-400 bg-[#f4f4f4] px-4  py-3 text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                 value={totalWinner}
//                 required={true}
//               />
//             </div>
//             {/* Draw Status
//             <div>
//               <p className="pb-2 font-poppins text-base font-normal text-blackText">
//                 Draw Status:
//               </p>
//               <select
//                 className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
//                 placeholder="Enter Lottery Name"
//                 onChange={(e) => {
//                   setLotteryData({
//                     ...lotteryData,
//                     isDrawComplete: e.target.value,
//                   });
//                 }}>
//                 <option value="">Select</option>
//                 <option value={false}>Running</option>
//                 <option value={true}>Close</option>
//               </select>
//             </div> */}
//           </div>
//         </div>
//         <div className="mt-5 flex items-center justify-end gap-3 lg:gap-5">
//           <button
//             onClick={() => setModalOpen(false)}
//             className="flex items-center justify-center gap-2 rounded-lg bg-[#F56E6E] px-4 py-2 font-poppins text-base font-normal text-white">
//             <svg
//               style={{ color: "#fff" }}
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="feather feather-x cursor-pointer">
//               <line x1="18" y1="6" x2="6" y2="18"></line>
//               <line x1="6" y1="6" x2="18" y2="18"></line>
//             </svg>{" "}
//             Cancel
//           </button>
//           {isLoading ? (
//             <BtnLoader />
//           ) : (
//             <button
//               type="submit"
//               onClick={(e) => handleSubmit(e)}
//               className="flex items-center justify-center gap-2 rounded-lg bg-[#63AD6F] px-4 py-2 font-poppins text-base font-normal text-white">
//               <svg
//                 style={{ color: "#fff" }}
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-check">
//                 <polyline points="20 6 9 17 4 12" />
//               </svg>{" "}
//               Confirm
//             </button>
//           )}
//         </div>
//       </form>
//     </Fragment>
//   );
// };

// export default UpdateLottery;


import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UnAuth } from "../../Pages/Auth/UnAuth";
import BtnLoader from "../Shared/BtnLoader";
import { ENDPOINT } from "../../App/config/endpoint";
import ImageUploader from "../Shared/ImageUploader";

const UpdateLottery = ({
  setModalOpen,
  isLoading,
  setIsLoading,
  id,
  handleData,
}) => {
  const [data, setData] = useState({});
  const token = JSON.parse(localStorage.getItem("authInfo"));

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.ticket?.getDetailTicket}${id}`,
        {
          headers: {
            Authorization: "Token " + token.token,
          },
        }
      )
      .then((res) => {
        if (res.data.status === "error") {
          toast.error(res.data.message);
        } else {
          setData(res.data);
        }
      })
      .catch((e) => {
        UnAuth(e);
      });
  }, [id]);

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [totalWinner, setTotalWinner] = useState(0);

  useEffect(() => {
    setImage1({ img: data.image_banner });
    setImage2({ img: data.image_prizes });
    setImage3({ img: data.image_first });
    setImage4({ img: data.image_second });
    setImage5({ img: data.image_third });
  }, [data]);

  const [tktTime, setTktTime] = useState({
    openDate: "",
    openTime: "",
    closeDate: "",
    closeTime: "",
  });

  const [lotteryData, setLotteryData] = useState({});

  useEffect(() => {
    setLotteryData({
      LotteryName: data?.LotteryName,
      Price: data?.Price,
      PriceAmount: data?.PriceAmount,
      NumberOfWinners: Number(data?.NumberOfWinners),
      NumberOfTickets: data?.NumberOfTickets,
      OpeningTime: data?.OpeningTime,
      ClosingTime: data?.ClosingTime,
      FirstPrizeName: data?.FirstPrizeName,
      SecondPrizeName: data?.SecondPrizeName,
      ThirdPrizeName: data?.ThirdPrizeName,
      TotalFirstPrizeWinner: data?.TotalFirstPrizeWinner,
      TotalSecondPrizeWinner: data?.TotalSecondPrizeWinner,
      TotalThirdPrizeWinner: data?.TotalThirdPrizeWinner,
      image_first: data?.image_first,
      image_second: data?.image_second,
      image_third: data?.image_third,
      image_banner: data?.image_banner,
      image_prizes: data?.image_prizes,
    });
  }, [data]);

  useEffect(() => {
    setTotalWinner(
      parseInt(lotteryData?.TotalFirstPrizeWinner) +
        parseInt(lotteryData?.TotalSecondPrizeWinner) +
        parseInt(lotteryData?.TotalThirdPrizeWinner)
    );
  }, [lotteryData]);

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

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (token.token) {
      const updatedData = {};

      Object.keys(lotteryData).forEach((key) => {
        if (lotteryData[key] !== data[key]) {
          updatedData[key] = lotteryData[key];
        }
      });
      axios
        .post(
          `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.ticket.updateTicket}${id}`,
          updatedData,
          {
            headers: {
              Authorization: "Token " + token.token,
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.status === "error") {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            handleData();
            setModalOpen(false);
            setIsLoading(false);
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
                defaultValue={data?.LotteryName}
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
                <span className="rounded-l-lg border border-black bg-black px-3 py-3 text-base font-semibold text-white">$</span>
                <input
                  type="number"
                  className="w-full rounded-r-lg border border-gray-400 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  defaultValue={data?.Price}
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
                defaultValue={data?.PriceAmount}
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
                defaultValue={data?.NumberOfTickets}
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
                  defaultValue={data?.OpeningTime}
                  onChange={(e) => setTktTime({ ...tktTime, openDate: e.target.value })}
                  required
                />
                <input
                  type="time"
                  className="w-full rounded-lg border border-gray-400 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  defaultValue={data?.OpeningTime}
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
                  defaultValue={data?.ClosingTime}
                  onChange={(e) => setTktTime({ ...tktTime, closeDate: e.target.value })}
                  required
                />
                <input
                  type="time"
                  className="w-full rounded-lg border border-gray-400 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  defaultValue={data?.ClosingTime}
                  onChange={(e) => setTktTime({ ...tktTime, closeTime: e.target.value })}
                  required
                />
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
                defaultValue={data?.FirstPrizeName}
                onChange={(e) => setLotteryData({ ...lotteryData, FirstPrizeName: e.target.value })}
                required
              />
              <p className="pb-2 mt-4 font-poppins text-base font-semibold text-blackText">First Prize Image:</p>
              <ImageUploader image={image3} setState={setImage3} />
              <p className="pb-2 mt-4 font-poppins text-base font-semibold text-blackText">Number Of First Prize Winners:</p>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-400 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                defaultValue={data?.TotalFirstPrizeWinner}
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
                defaultValue={data?.SecondPrizeName}
                onChange={(e) => setLotteryData({ ...lotteryData, SecondPrizeName: e.target.value })}
                required
              />
              <p className="pb-2 mt-4 font-poppins text-base font-semibold text-blackText">Second Prize Image:</p>
              <ImageUploader image={image4} setState={setImage4} />
              <p className="pb-2 mt-4 font-poppins text-base font-semibold text-blackText">Number Of Second Prize Winners:</p>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-400 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                defaultValue={data?.TotalSecondPrizeWinner}
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
                defaultValue={data?.ThirdPrizeName}
                onChange={(e) => setLotteryData({ ...lotteryData, ThirdPrizeName: e.target.value })}
                required
              />
              <p className="pb-2 mt-4 font-poppins text-base font-semibold text-blackText">Third Prize Image:</p>
              <ImageUploader image={image5} setState={setImage5} />
              <p className="pb-2 mt-4 font-poppins text-base font-semibold text-blackText">Number Of Third Prize Winners:</p>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-400 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                defaultValue={data?.TotalThirdPrizeWinner}
                onChange={(e) => setLotteryData({ ...lotteryData, TotalThirdPrizeWinner: e.target.value })}
                required
              />
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

export default UpdateLottery;
