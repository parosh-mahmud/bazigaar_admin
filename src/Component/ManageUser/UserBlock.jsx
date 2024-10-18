
import { ENDPOINT } from "../../App/config/endpoint";

import axios from "axios";
import React, { Fragment } from "react";
import { toast } from "react-hot-toast";
import { UnAuth } from "../../Pages/Auth/UnAuth";
import BtnLoader from "../Shared/BtnLoader";

const UserBlock = ({
  isLoading,
  setIsLoading,
  setModalOpen,
  DltTitle,
  handleData,id
}) => {
  const confirmBlock = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem("authInfo"));
    // JSON.parse(localStorage.getItem("authInfo"));
  //   .post(
  //     `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.ticket.drawLottery}${id}`,
  //     {},
  //     {
  //         headers: {
  //             Authorization: "Token " + token.token,
  //         },
  //     }
  // )
    axios

      .post(`${process.env.REACT_APP_MAIN_URL}${ENDPOINT.user.userBlock}${id}/`,{}, {

        headers: {
          Authorization: "Token " + token.token,
        },
      })
      .then((res) => {
        if (res.data.status === "error") {
          toast.error(res.data.message);
          setIsLoading(false);
        } else {
          toast.success(res.data.message);
          setIsLoading(false);
          setModalOpen(false);
          handleData();
        }
      })
      .catch((e) => {
        // console.log(e);
        // UnAuth(e);
        setIsLoading(false);
      });
  };
  return (
    <Fragment>
      <h1 className="text-xl text-[#c14029]">
        Are you sure you wanted to {DltTitle}?
      </h1>
      <div className="mt-20 flex items-center justify-end gap-3 lg:gap-5">
        <button
          onClick={() => setModalOpen(false)}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#F56E6E] px-4 py-2 font-poppins text-base font-normal text-white">
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
            className="feather feather-x cursor-pointer">
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
            onClick={(e) => confirmBlock(e)}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#63AD6F] px-4 py-2 font-poppins text-base font-normal text-white">
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
              className="feather feather-check">
              <polyline points="20 6 9 17 4 12" />
            </svg>{" "}
            Confirm
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default UserBlock;
