import axios from "axios";
import React, { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import { UnAuth } from "../Auth/UnAuth";
import BtnLoader from "../../Component/Shared/BtnLoader";

const UpdateRole = ({
  setModalOpen,
  isLoading,
  setIsLoading,
  username,
  role,
  handleData,
  endpoint,
}) => {
  const [formData, setformData] = useState({
    is_agent: "",
  });
  const update = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem("authInfo"));
    axios
      .patch(`${endpoint}/`, formData, {
        headers: {
          Authorization: "Token " + token.token,
        },
      })
      .then((res) => {
        if (res.data.status === "error") {
          toast.error(res.data.msg);
          setIsLoading(false);
        } else {
          toast.success(res.data.msg);
          setIsLoading(false);
          handleData();
          setModalOpen(false);
        }
      })
      .catch((e) => {
        UnAuth(e);
        setIsLoading(false);
      });
  };
  console.log("formData", formData);
  return (
    <Fragment>
      <form action="">
        {/* username */}
        <div>
          <p className="pb-2 font-poppins text-base font-normal text-blackText">
            Username
          </p>
          <input
            type="text"
            className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            defaultValue={username}
            disabled={true}
          />
        </div>
        {/* Role */}
        <div>
          <p className="pb-2 font-poppins text-base font-normal text-blackText">
            Edit Agent
          </p>
          <select
            className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="Category"
            onChange={(e) => {
              setformData({
                ...formData,
                is_agent: e.target.value,
              });
            }}
            required={true}>
            <option value="">{role === true ? "Active" : "Deactive"}</option>
            <option value={true}>Active</option>
            <option value={false}>Deactive</option>
          </select>
        </div>
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
              onClick={(e) => update(e)}
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
      </form>
    </Fragment>
  );
};

export default UpdateRole;
