import React, { Fragment, useEffect, useState } from "react";
import PrimaryLayout from "../../Component/layouts/PrimaryLayout";
import { toast } from "react-hot-toast";
import { UnAuth } from "../Auth/UnAuth";
import { ENDPOINT } from "../../App/config/endpoint";
import axios from "axios";
import { useParams } from "react-router-dom";

const RequestDetails = ({ isLoading, setIsLoading }) => {
  const id = useParams();
  const [datas, setDatas] = useState([]);
  const token = JSON.parse(localStorage.getItem("authInfo"));

  const handleData = () => {
    axios
      .get(
        // `${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.ticket?.getTicket}`,
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.reseller?.coinDetails}${id.id}`,
        {
          headers: {
            Authorization: "Token " + token.token,
          },
        }
      )
      .then((res) => {
        if (res.data.type === "error") {
          toast.error(res.message);
        } else {
          console.log(res.data);
          setDatas(res.data);
        }
      })
      .catch((e) => {
        // console.log(e);
        UnAuth(e);
      });
  };
  useEffect(() => {
    handleData();
  }, []);

  return (
    <Fragment>
      <PrimaryLayout pageTitle="Request Details">
        <ul className="py-8">
          <li className="flex w-full justify-between rounded-t-lg border border-neutral-400 p-4">
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              Request Date & Time
            </span>
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              {datas?.date}
            </span>
          </li>
          <li className="flex w-full justify-between border border-t-[0px] border-neutral-400 p-4">
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              Reseller Image
            </span>
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              <img
                className="h-[50%] w-[50%] rounded-full"
                src={`${process.env.REACT_APP_MAIN_URL}${datas?.reseller_image_url}`}
                alt={datas?.reseller_name}
              />
            </span>
          </li>
          <li className="flex w-full justify-between border border-t-[0px] border-neutral-400 p-4">
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              Reseller ID
            </span>
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              {datas?.resellerId}
            </span>
          </li>
          <li className="flex w-full justify-between border border-t-[0px] border-neutral-400 p-4">
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              Reseller Name
            </span>
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              {datas?.reseller_name}
            </span>
          </li>

          <li className="flex w-full justify-between border border-t-[0px] border-neutral-400 p-4">
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              BgCoin
            </span>
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              {datas?.bgcoin}
            </span>
          </li>
          <li className="flex w-full justify-between border border-t-[0px] border-neutral-400 p-4">
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              Amount
            </span>
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              ${datas?.amount}
            </span>
          </li>
          <li className="flex w-full justify-between border border-t-[0px] border-neutral-400 p-4">
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              Rate
            </span>
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              1 USD = 100 BGCOIN
            </span>
          </li>
          <li className="flex w-full justify-between border border-t-[0px] border-neutral-400 p-4">
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              Transaction Number
            </span>
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              {datas?.transaction_number}
            </span>
          </li>
          <li className="flex w-full justify-between border border-t-[0px] border-neutral-400 p-4">
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              Document
            </span>
            <span>
              <a href={`${process.env.REACT_APP_MAIN_URL}${datas?.doc_url}`} target="_blank" rel="noreferrer">
		<img src={`${process.env.REACT_APP_MAIN_URL}${datas?.doc_url}`} alt={datas?.reseller_name} width='40px' height='25px'/>
              </a>
            </span>
          </li>
          <li className="flex w-full justify-between rounded-b-lg border border-t-[0px] border-neutral-400 p-4 capitalize">
            <span className="text-base font-medium leading-[25.20px] text-zinc-800 lg:text-lg">
              Status
            </span>

            <span
              className={`rounded-full px-5 py-1 font-poppins text-base font-medium leading-[25.20px] lg:text-lg ${
                datas?.status === "accepted"
                  ? "bg-[#63AD6F] bg-opacity-10 text-[#63AD6F]"
                  : datas?.status === "rejected"
                  ? "bg-[#F76868] bg-opacity-10 text-[#F76868]"
                  : "bg-orange-400 bg-opacity-10 text-orange-400"
              }`}>
              {datas?.status}
            </span>
          </li>
        </ul>
      </PrimaryLayout>
    </Fragment>
  );
};

export default RequestDetails;
