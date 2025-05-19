import React, { Fragment, useEffect, useState } from "react";
import { ENDPOINT } from "../../App/config/endpoint";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UnAuth } from "../../Pages/Auth/UnAuth";
import BtnLoader from "../Shared/BtnLoader";

const AddBalance = ({
  setModalOpen,
  isLoading,
  setIsLoading,
  id,
  handleData,
}) => {
  const [amount, setAmount] = useState(0);
  const token = JSON.parse(localStorage.getItem("authInfo"));
  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    axios.post(
      `${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.user?.userAddBalance}${id}/`,
      { amount: amount },
      {
        headers: {
          Authorization: "Token " + token.token,
          "Content-Type": "application/json",
        },
      }
    )
    
      .then((res) => {
        if (res.data.status === "error") {
          toast.error(res.data.message);
          setIsLoading(false);
        } else {
          toast.success(res.data.success);
          handleData();
          setIsLoading(false);
          setModalOpen(false);
        }
      })
      .catch((e) => {
        // console.log(e);
        UnAuth(e);
        setIsLoading(false);
      });
  };
  return (
    <Fragment>
      <form action="">
        <div>
          <div>
            <p className="pb-2 font-poppins text-base font-normal text-blackText">
              User Account ID
            </p>
            <input
              type="text"
              disabled={true}
              className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              defaultValue={id}
              required={true}
            />
          </div>
          {/* Amount: */}
          <div>
            <p className="font-poppins text-base font-normal text-blackText">
              Amount:
            </p>
            <div className="flex items-center pt-2">
              <p className="mb-4 rounded-l-lg border border-black bg-black px-3 py-3 text-base font-semibold text-white">
                $
              </p>
              <input
                min={0}
                type="number"
                className="mb-4 w-full rounded-r-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                required={true}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-3 lg:gap-5">
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
              onClick={(e) => handleSubmit(e)}
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
              Add
            </button>
          )}
        </div>
      </form>
    </Fragment>
  );
};
export default AddBalance;
