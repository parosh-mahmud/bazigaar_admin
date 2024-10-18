import axios from "axios";
import React, { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import { UnAuth } from "../../Pages/Auth/UnAuth";
import BtnLoader from "./BtnLoader";

const WithdrawStatus = ({
  isLoading,
  setIsLoading,
  setModalOpen,
  handleData,
  endpoint,
  amount,
}) => {
  const [formData, setformData] = useState({
    amount: amount,
    status: "",
  });
  const confirmUpdate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem("authInfo"));
    axios
      .put(`${endpoint}`, formData, {
        headers: {
          Authorization: "Token " + token.token,
        },
      })
      .then((res) => {
        if (res?.status === 400) {
          toast.error(res.data.error);
          setIsLoading(false);
        } else {
          toast.success(res.data.message);
          setIsLoading(false);
          handleData();
          setModalOpen(false);
        }
      })
      .catch((e) => {
        // console.log(e);
        if (e?.response?.status === 400) {
          toast.error(e?.response?.data?.error);
        } else {
          UnAuth(e);
        }
        setIsLoading(false);
      });
  };
  return (
    <Fragment>
      <form action="" encType="multipart/form-data">
        {/* Amount */}
        <div>
          <p className="pb-2 font-poppins text-base font-normal text-blackText">
            Amount
          </p>
          <input
            type="number"
            className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            value={amount}
            onChange={(e) => {
              setformData({
                ...formData,
                amount: e.target.value,
              });
            }}
            required={true}
          />
        </div>

        {/* status */}
        <div>
          <p className="pb-2 font-poppins text-base font-normal text-blackText">
            Status
          </p>
          <select
            className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="Status"
            onChange={(e) => {
              setformData({
                ...formData,
                status: e.target.value,
              });
            }}
            required={true}>
            <option value="">Select</option>
            <option value="Accepted">Accept</option>
            <option value="Rejected">Reject</option>
          </select>
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
          <button
            onClick={(e) => confirmUpdate(e)}
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
        </div>
      </form>
    </Fragment>
  );
};

export default WithdrawStatus;
