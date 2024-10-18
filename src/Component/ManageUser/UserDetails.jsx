import React, { useEffect, useState } from "react";
import PrimaryLayout from "../layouts/PrimaryLayout";
import { BalanceIcon } from "../../Assets/locales/UserDetailsIcons";
import axios from "axios";
import { ENDPOINT } from "../../App/config/endpoint";
import { toast } from "react-hot-toast";
import { UnAuth } from "../../Pages/Auth/UnAuth";
import { Link, useParams } from "react-router-dom";
import SmallModal from "../Modals/SmallModal";
import AddBalance from "./AddBalance";
import AddSubstract from "./AddSubstract";
import UserBlock from "./UserBlock";
import UserRoleUpdate from "./UserRoleUpdate";

const UserDetails = ({ isLoading, setIsLoading }) => {
  const [tableDatas, setTableDatas] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalContent2, setModalContent2] = useState("");
  const [modalContent3, setModalContent3] = useState("");
  const userID = useParams();
  // fetching user data
  const getAllUserInfo = () => {
    const token = JSON.parse(localStorage.getItem("authInfo"));

    axios
      .get(
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.user.userDetails}${userID?.id}`,
        {
          headers: {
            Authorization: "token " + token.token,
          },
        }
      )
      .then((res) => {
        if (res.data.type === "error") {
          toast.error(res.data.msg);
        } else {
          console.log("user details", res.data);
          setTableDatas(res.data);
        }
      })
      .catch((e) => {
        UnAuth(e);
      });
  };

  useEffect(() => {
    getAllUserInfo();
  }, []);

  const handleAdd = (e, id) => {
    e.preventDefault();
    setModalOpen(true);
    setModalContent(
      <AddBalance
        setModalOpen={setModalOpen}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        id={id}
        handleData={getAllUserInfo}
      />
    );
  };
  const handleSubtract = (e, id) => {
    e.preventDefault();
    setModalOpen2(true);
    setModalContent2(
      <AddSubstract
        setModalOpen={setModalOpen2}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        id={id}
        handleData={getAllUserInfo}
      />
    );
  };

  const handleBlock = (e, id, DltTitle) => {
    e.preventDefault();
    setModalOpen3(true);
    setModalContent3(
      <UserBlock
        id={id}
        setModalOpen={setModalOpen3}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        handleData={getAllUserInfo}
        DltTitle={`block ${DltTitle}`}
        endpoint={`${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.user?.userBlock}${id}/`}
      />
    );
  };
  return (
    <PrimaryLayout pageTitle="User Details">
      <div className="mb-4 py-5">
        <div className="grid gap-[1.875rem] sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {tableDatas?.cards?.map((data, i) => {
            return (
              <div
                key={i}
                className="rounded-lg bg-white px-[22px] py-[12px] shadow-userDetailsCardShadow md:px-[32px] md:py-[18px] lg:px-[42px] lg:py-[24px]">
                <div className="flex items-center justify-center">
                  <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-[3px]">
                    <div className="text-2xl font-semibold text-neutral-800">
                      ${data?.value}
                    </div>
                    <div className="text-lg font-normal text-neutral-800">
                      {data?.header}
                    </div>
                  </div>
                  <div className="relative h-[70px] w-[70px]">
                    <BalanceIcon />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 py-7 sm:grid-cols-2 md:grid-cols-3 md:py-14 lg:grid-cols-4 xl:gap-10">
          {/* Add Balance */}
          <Link
            onClick={(e) => handleAdd(e, tableDatas?.user?.id)}
            className="mx-auto w-full max-w-[25rem] sm:ml-0">
            <h4 className="inter-500 mb-2 text-lg leading-6">Add Balance</h4>
            <div className="flex flex-wrap items-center justify-center rounded border border-[#63C054] bg-[#63C054]/20 px-6 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none">
                <path
                  d="M11.8847 13.3652H7.71802"
                  stroke="#63C054"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.80151 11.3315V15.4982"
                  stroke="#63C054"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.55 2.59828L10.525 2.65662L8.1083 8.26495H5.7333C5.16663 8.26495 4.62497 8.38162 4.1333 8.58995L5.59163 5.10662L5.62497 5.02328L5.6833 4.88995C5.69997 4.83995 5.71663 4.78995 5.74163 4.74828C6.8333 2.22328 8.06663 1.64828 10.55 2.59828Z"
                  stroke="#63C054"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.0417 8.43197C14.6667 8.3153 14.2667 8.2653 13.8667 8.2653H8.1084L10.5251 2.65697L10.5501 2.59863C10.6751 2.6403 10.7917 2.69863 10.9167 2.74863L12.7584 3.52363C13.7834 3.94863 14.5001 4.3903 14.9334 4.92363C15.0167 5.02363 15.0834 5.1153 15.1417 5.22363C15.2167 5.3403 15.2751 5.45697 15.3084 5.58197C15.3417 5.65697 15.3667 5.73197 15.3834 5.79863C15.6084 6.49863 15.4751 7.35697 15.0417 8.43197Z"
                  stroke="#63C054"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.9348 12.3318V13.9568C17.9348 14.1235 17.9265 14.2901 17.9182 14.4568C17.7598 17.3651 16.1348 18.8318 13.0515 18.8318H6.55151C6.35151 18.8318 6.15151 18.8151 5.95985 18.7901C3.30985 18.6151 1.89318 17.1985 1.71818 14.5485C1.69318 14.3568 1.67651 14.1568 1.67651 13.9568V12.3318C1.67651 10.6568 2.69318 9.21514 4.14318 8.59014C4.64318 8.3818 5.17651 8.26514 5.74318 8.26514H13.8765C14.2848 8.26514 14.6848 8.32347 15.0515 8.4318C16.7098 8.94014 17.9348 10.4901 17.9348 12.3318Z"
                  stroke="#63C054"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.59175 5.10693L4.13341 8.59027C2.68341 9.21527 1.66675 10.6569 1.66675 12.3319V9.89027C1.66675 7.5236 3.35008 5.5486 5.59175 5.10693Z"
                  stroke="#63C054"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.9322 9.88988V12.3315C17.9322 10.4982 16.7155 8.93988 15.0488 8.43988C15.4822 7.35654 15.6072 6.50654 15.3988 5.79821C15.3822 5.72321 15.3572 5.64821 15.3238 5.58154C16.8738 6.38154 17.9322 8.02321 17.9322 9.88988Z"
                  stroke="#63C054"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="poppins-500 ml-2.5 text-base leading-[1.3rem] text-[#63C054]">
                Balance
              </p>
            </div>
          </Link>
          {/* Subtract Balance */}
          <Link
            onClick={(e) => handleSubtract(e, tableDatas?.user?.id)}
            className="mx-auto w-full max-w-[25rem] sm:ml-0">
            <h4 className="inter-500 mb-2 text-lg leading-6">
              Subtract Balance
            </h4>
            <div className="flex flex-wrap items-center justify-center rounded border border-red-400 bg-red-400 bg-opacity-20 px-6 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none">
                <path
                  d="M11.8847 13.3652H7.71802"
                  stroke="#F76868"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.80151 11.3315V15.4982"
                  stroke="#F76868"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.55 2.59828L10.525 2.65662L8.1083 8.26495H5.7333C5.16663 8.26495 4.62497 8.38162 4.1333 8.58995L5.59163 5.10662L5.62497 5.02328L5.6833 4.88995C5.69997 4.83995 5.71663 4.78995 5.74163 4.74828C6.8333 2.22328 8.06663 1.64828 10.55 2.59828Z"
                  stroke="#F76868"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.0417 8.43197C14.6667 8.3153 14.2667 8.2653 13.8667 8.2653H8.1084L10.5251 2.65697L10.5501 2.59863C10.6751 2.6403 10.7917 2.69863 10.9167 2.74863L12.7584 3.52363C13.7834 3.94863 14.5001 4.3903 14.9334 4.92363C15.0167 5.02363 15.0834 5.1153 15.1417 5.22363C15.2167 5.3403 15.2751 5.45697 15.3084 5.58197C15.3417 5.65697 15.3667 5.73197 15.3834 5.79863C15.6084 6.49863 15.4751 7.35697 15.0417 8.43197Z"
                  stroke="#F76868"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.9348 12.3318V13.9568C17.9348 14.1235 17.9265 14.2901 17.9182 14.4568C17.7598 17.3651 16.1348 18.8318 13.0515 18.8318H6.55151C6.35151 18.8318 6.15151 18.8151 5.95985 18.7901C3.30985 18.6151 1.89318 17.1985 1.71818 14.5485C1.69318 14.3568 1.67651 14.1568 1.67651 13.9568V12.3318C1.67651 10.6568 2.69318 9.21514 4.14318 8.59014C4.64318 8.3818 5.17651 8.26514 5.74318 8.26514H13.8765C14.2848 8.26514 14.6848 8.32347 15.0515 8.4318C16.7098 8.94014 17.9348 10.4901 17.9348 12.3318Z"
                  stroke="#F76868"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.59175 5.10693L4.13341 8.59027C2.68341 9.21527 1.66675 10.6569 1.66675 12.3319V9.89027C1.66675 7.5236 3.35008 5.5486 5.59175 5.10693Z"
                  stroke="#F76868"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.9322 9.88988V12.3315C17.9322 10.4982 16.7155 8.93988 15.0488 8.43988C15.4822 7.35654 15.6072 6.50654 15.3988 5.79821C15.3822 5.72321 15.3572 5.64821 15.3238 5.58154C16.8738 6.38154 17.9322 8.02321 17.9322 9.88988Z"
                  stroke="#F76868"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="poppins-500 ml-2.5 text-base leading-[1.3rem] text-red-400">
                Balance
              </p>
            </div>
          </Link>
          {/* User Logins History */}
          <div className="mx-auto w-full max-w-[25rem] sm:ml-0">
            <h4 className="inter-500 mb-2 text-lg leading-6">
              User Logins History
            </h4>
            <div className="flex flex-wrap items-center justify-center rounded border border-blue-500 bg-blue-500 bg-opacity-20 px-6 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none">
                <path
                  d="M17.5 6.33317V14.6665C17.5 17.1665 16.25 18.8332 13.3333 18.8332H6.66667C3.75 18.8332 2.5 17.1665 2.5 14.6665V6.33317C2.5 3.83317 3.75 2.1665 6.66667 2.1665H13.3333C16.25 2.1665 17.5 3.83317 17.5 6.33317Z"
                  stroke="#3B76E1"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.0833 4.25V5.91667C12.0833 6.83333 12.8333 7.58333 13.7499 7.58333H15.4166"
                  stroke="#3B76E1"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.66675 11.3335H10.0001"
                  stroke="#3B76E1"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.66675 14.6665H13.3334"
                  stroke="#3B76E1"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="poppins-500 ml-2.5 text-base leading-[1.3rem] text-blue-500">
                Logins
              </p>
            </div>
          </div>

          {/* Notification */}
          {/* <div className="mx-auto w-full max-w-[25rem] sm:ml-0">
            <h4 className="inter-500 mb-2 text-lg leading-6">Notification</h4>
            <div className="flex flex-wrap items-center justify-center rounded border border-orange-300 bg-orange-300 bg-opacity-20 px-6 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none">
                <path
                  d="M10.5167 2.92529C7.75841 2.92529 5.51674 5.16696 5.51674 7.92529V10.3336C5.51674 10.842 5.30007 11.617 5.04174 12.0503L4.08341 13.642C3.49174 14.6253 3.90007 15.717 4.98341 16.0836C8.57507 17.2836 12.4501 17.2836 16.0417 16.0836C17.0501 15.7503 17.4917 14.5586 16.9417 13.642L15.9834 12.0503C15.7334 11.617 15.5167 10.842 15.5167 10.3336V7.92529C15.5167 5.17529 13.2667 2.92529 10.5167 2.92529Z"
                  stroke="#FFA91C"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M12.0582 3.1667C11.7999 3.0917 11.5332 3.03337 11.2582 3.00003C10.4582 2.90003 9.69152 2.95837 8.97485 3.1667C9.21652 2.55003 9.81652 2.1167 10.5165 2.1167C11.2165 2.1167 11.8165 2.55003 12.0582 3.1667Z"
                  stroke="#FFA91C"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.0166 16.3833C13.0166 17.7583 11.8916 18.8833 10.5166 18.8833C9.83327 18.8833 9.19993 18.6 8.74993 18.15C8.29993 17.7 8.0166 17.0666 8.0166 16.3833"
                  stroke="#FFA91C"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
              </svg>
              <p className="poppins-500 ml-2.5 text-base leading-[1.3rem] text-orange-300">
                Notification
              </p>
            </div>
          </div> */}

          {/* Block User */}
          <div>
            <h4 className="inter-500 mb-2 text-lg leading-6">Block User</h4>
            <button
              onClick={(e) =>
                handleBlock(e, tableDatas?.user?.id, tableDatas?.user?.username)
              }
              className={`mx-auto w-full max-w-[25rem] sm:ml-0`}
              disabled={tableDatas?.user?.is_active === false ? true : false}>
              <div className="flex flex-wrap items-center justify-center rounded border border-red-400 bg-red-400 bg-opacity-30 px-6 py-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none">
                  <path
                    d="M10.4332 18.8332C15.0165 18.8332 18.7665 15.0832 18.7665 10.4998C18.7665 5.9165 15.0165 2.1665 10.4332 2.1665C5.84985 2.1665 2.09985 5.9165 2.09985 10.4998C2.09985 15.0832 5.84985 18.8332 10.4332 18.8332Z"
                    stroke="#F76868"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.36646 16.3335L15.4999 4.66683"
                    stroke="#F76868"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="poppins-500 ml-2.5 text-base leading-[1.3rem] text-red-400">
                  {tableDatas?.user?.is_active === false ? "Blocked" : "Block"}
                </p>
              </div>
            </button>
          </div>
        </div>

        <div>
          <h1 className="mb-10 mt-4 text-2xl font-semibold leading-[50.40px] text-neutral-800 lg:text-4xl">
            Personal Information
          </h1>

          <form action="" mathod="">
            <div className="mb-5 grid gap-5 lg:mb-[1.875rem] lg:grid-cols-3">
              <div className="w-full">
                <h4 className="inter-500 mb-2 text-lg leading-6">
                  First Name:
                </h4>
                <input
                  className="poppins-400 w-full rounded border-[.031rem] border-[#999999] px-6 py-4 text-base leading-[1.3rem] text-[#222222]"
                  type="text"
                  disabled={true}
                  defaultValue={
                    tableDatas?.user?.first_name !== null
                      ? tableDatas?.user?.first_name
                      : "N/A"
                  }
                />
              </div>
              <div className="w-full">
                <h4 className="inter-500 mb-2 text-lg leading-6">Last Name:</h4>
                <input
                  className="poppins-400 w-full rounded border-[.031rem] border-[#999999] px-6 py-4 text-base leading-[1.3rem] text-[#222222]"
                  type="text"
                  disabled={true}
                  defaultValue={
                    tableDatas?.user?.last_name !== null
                      ? tableDatas?.user?.last_name
                      : "N/A"
                  }
                />
              </div>
              <div className="w-full">
                <h4 className="inter-500 mb-2 text-lg leading-6">Nick Name</h4>
                <input
                  className="poppins-400 w-full rounded border-[.031rem] border-[#999999] px-6 py-4 text-base leading-[1.3rem] text-[#222222]"
                  type="text"
                  disabled={true}
                  defaultValue={
                    tableDatas?.user?.nickname !== null
                      ? tableDatas?.user?.nickname
                      : "N/A"
                  }
                />
              </div>
            </div>
            <div className="mb-5 grid gap-5 lg:mb-[1.875rem] lg:grid-cols-2">
              <div className="w-full">
                <h4 className="inter-500 mb-2 text-lg leading-6">
                  Date Of Birth
                </h4>
                <input
                  className="poppins-400 w-full rounded border-[.031rem] border-[#999999] px-6 py-4 text-base leading-[1.3rem] text-[#222222]"
                  type="text"
                  disabled={true}
                  defaultValue={
                    tableDatas?.user?.date_of_birth !== null
                      ? tableDatas?.user?.date_of_birth
                      : "N/A"
                  }
                />
              </div>
              <div className="w-full">
                <h4 className="inter-500 mb-2 text-lg leading-6">
                  Email Address:
                </h4>
                <div className="relative w-full">
                  <input
                    className="poppins-400 w-full rounded border-[.031rem] border-[#999999] px-6 py-4 text-base leading-[1.3rem] text-[#222222]"
                    type="text"
                    disabled={true}
                    defaultValue={
                      tableDatas?.user?.email !== null
                        ? tableDatas?.user?.email
                        : "N/A"
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mb-5 grid gap-5 lg:mb-[1.875rem] lg:grid-cols-2">
              <div className="w-full">
                <h4 className="inter-500 mb-2 text-lg leading-6">
                  Mobile Number:
                </h4>
                <div className="relative w-full">
                  <input
                    className="poppins-400 w-full rounded border-[.031rem] border-[#999999] px-6 py-4 pl-16 text-base leading-[1.3rem] text-[#222222]"
                    type="text"
                    disabled={true}
                    defaultValue={
                      tableDatas?.user?.phoneNumber !== null
                        ? tableDatas?.user?.phoneNumber
                        : "N/A"
                    }
                  />
                  <div className="absolute left-0 top-0 mx-auto h-full w-[3.65rem] bg-black px-2 py-4">
                    <p className="inter-500 text-base leading-[1.4rem] text-white">
                      {tableDatas?.user?.countryCode !== null
                        ? tableDatas?.user?.countryCode
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <h4 className="inter-500 mb-2 text-lg leading-6">Address:</h4>
                <input
                  className="poppins-400 w-full rounded border-[.031rem] border-[#999999] px-6 py-4 text-base leading-[1.3rem] text-[#222222]"
                  type="text"
                  disabled={true}
                  defaultValue={
                    tableDatas?.user?.address !== null
                      ? tableDatas?.user?.address
                      : "N/A"
                  }
                />
              </div>
            </div>

            <div className="mb-5 grid gap-5 md:grid-cols-2 lg:mb-[1.875rem] lg:grid-cols-4">
              <div className="w-full">
                <h4 className="inter-500 mb-2 text-lg leading-6">City</h4>
                <input
                  className="poppins-400 w-full rounded border-[.031rem] border-[#999999] px-6 py-4 text-base leading-[1.3rem] text-[#222222]"
                  type="text"
                  disabled={true}
                  defaultValue={
                    tableDatas?.user?.city !== null
                      ? tableDatas?.user?.city
                      : "N/A"
                  }
                />
              </div>
              <div className="w-full">
                <h4 className="inter-500 mb-2 text-lg leading-6">State</h4>
                <input
                  className="poppins-400 w-full rounded border-[.031rem] border-[#999999] px-6 py-4 text-base leading-[1.3rem] text-[#222222]"
                  type="text"
                  disabled={true}
                  defaultValue={
                    tableDatas?.user?.state !== null
                      ? tableDatas?.user?.state
                      : "N/A"
                  }
                />
              </div>
              <div className="w-full">
                <h4 className="inter-500 mb-2 text-lg leading-6">
                  Zip/Postal Code
                </h4>
                <input
                  className="poppins-400 w-full rounded border-[.031rem] border-[#999999] px-6 py-4 text-base leading-[1.3rem] text-[#222222]"
                  type="text"
                  disabled={true}
                  defaultValue={
                    tableDatas?.user?.postal_code !== null
                      ? tableDatas?.user?.postal_code
                      : "N/A"
                  }
                />
              </div>
              <div className="w-full">
                <h4 className="inter-500 mb-2 text-lg leading-6">Country</h4>
                <input
                  className="poppins-400 w-full rounded border-[.031rem] border-[#999999] px-6 py-4 text-base leading-[1.3rem] text-[#222222]"
                  type="text"
                  disabled={true}
                  defaultValue={
                    tableDatas?.user?.country !== null
                      ? tableDatas?.user?.country
                      : "N/A"
                  }
                />
              </div>
            </div>
            <div className="mb-5 grid gap-5 lg:mb-[1.875rem] lg:grid-cols-3">
              <div className="w-full">
                <h4 className="inter-500 mb-2 text-lg leading-6">
                  Device Name
                </h4>
                <input
                  className="poppins-400 w-full rounded border-[.031rem] border-[#999999] px-6 py-4 text-base leading-[1.3rem] text-[#222222]"
                  type="text"
                  disabled={true}
                  defaultValue={
                    tableDatas?.user?.device_name !== null
                      ? tableDatas?.user?.device_name
                      : "N/A"
                  }
                />
              </div>
              <div className="w-full">
                <h4 className="inter-500 mb-2 text-lg leading-6">IP Address</h4>
                <input
                  className="poppins-400 w-full rounded border-[.031rem] border-[#999999] px-6 py-4 text-base leading-[1.3rem] text-[#222222]"
                  type="text"
                  disabled={true}
                  defaultValue={
                    tableDatas?.user?.ip_address !== null
                      ? tableDatas?.user?.ip_address
                      : "N/A"
                  }
                />
              </div>
              <div className="w-full">
                <h4 className="inter-500 mb-2 text-lg leading-6">
                  Operating System
                </h4>
                <input
                  className="poppins-400 w-full rounded border-[.031rem] border-[#999999] px-6 py-4 text-base leading-[1.3rem] text-[#222222]"
                  type="text"
                  disabled={true}
                  defaultValue={
                    tableDatas?.user?.operating_system !== null
                      ? tableDatas?.user?.operating_system
                      : "N/A"
                  }
                />
              </div>
            </div>
            <div className="mb-5 grid gap-5 lg:mb-[1.875rem] lg:grid-cols-2">
              <div className="w-full  ">
                <h4 className="inter-500 mb-2 text-lg leading-6">
                  Email Verification
                </h4>
                <div className="rounded border border-[#63C054] bg-[#63C054]/20 px-6 py-4">
                  <p className="poppins-500 ml-2.5 text-center text-base leading-[1.3rem] text-[#63C054]">
                    Verified
                  </p>
                </div>
              </div>
              <div className="w-full  ">
                <h4 className="inter-500 mb-2 text-lg leading-6">
                  Mobile Verification
                </h4>
                <div className="flex flex-wrap items-center justify-center rounded border border-red-400 bg-red-400 bg-opacity-30 px-6 py-4">
                  <p className="poppins-500 ml-2.5 text-center text-base leading-[1.3rem] text-red-400">
                    Unverified
                  </p>
                </div>
              </div>
            </div>
          </form>
          <UserRoleUpdate
            tableDatas={tableDatas}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            getAllUserInfo={getAllUserInfo}
            id={userID?.id}
          />
        </div>
      </div>

      <SmallModal
        title="Add Balance"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalContent={modalContent}
      />
      <SmallModal
        title="Add Subtract"
        modalOpen={modalOpen2}
        setModalOpen={setModalOpen2}
        modalContent={modalContent2}
      />
      <SmallModal
        title="Block User"
        modalOpen={modalOpen3}
        setModalOpen={setModalOpen3}
        modalContent={modalContent3}
      />
    </PrimaryLayout>
  );
};

export default UserDetails;
