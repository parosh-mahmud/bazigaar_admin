import axios from "axios";
import React, { useState } from "react";
import { ENDPOINT } from "../../App/config/endpoint";
import { toast } from "react-hot-toast";
import { UnAuth } from "../../Pages/Auth/UnAuth";

const UserRoleUpdate = ({
  tableDatas,
  setIsLoading,
  isLoading,
  getAllUserInfo,id
}) => {
  const [formData, setformData] = useState({
    isHost: tableDatas?.user?.isHost,
    isReseller: tableDatas?.user?.isReseller,
    is_agent: tableDatas?.user?.is_agent,
    is_active: tableDatas?.user?.is_active,
  });

  const handleOnclick = (e) => {
//     e.preventDefault();
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem("authInfo"));

    if (token.token) {
      axios
        .patch(
          `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.user.updateUser}${id}/`,
          formData,
          {
            headers: {
              Authorization: "Token " + token.token,
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.type === "error") {
            toast.error(res.data.msg);
          } else {
            toast.success(res.data.msg);
            setIsLoading(false);
            getAllUserInfo();
          }
        })
        .catch((e) => {
          // console.log(e);
          UnAuth(e);
          setIsLoading(false);
        });
    }
  };
  console.log(formData);
  return (
    <div>
      <h1 className="mb-10 mt-14 text-2xl font-semibold leading-[50.40px] text-neutral-800 lg:text-4xl">
        User Role Update
      </h1>
      <form action="" encType="multipart/form-data">
        <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mb-[1.875rem] lg:grid-cols-3">
          {/* block  */}
          {tableDatas?.user?.is_active === false && (
            <div className="w-full">
              <h4 className="inter-500 mb-2 text-lg leading-6">Unblock</h4>
              <select
                className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                onChange={(e) => {
                  setformData({
                    ...formData,
                    is_active: e.target.value,
                  });
                }}
                required={true}>
                <option value={tableDatas?.user?.is_active}>
                  {tableDatas?.user?.is_active === false && "Blocked"}
                </option>
                <option value={true}>Unblock</option>
              </select>
            </div>
          )}
          {/* host  */}
          <div className="w-full">
            <h4 className="inter-500 mb-2 text-lg leading-6">Host</h4>
            <select
              className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              onChange={(e) => {
                setformData({
                  ...formData,
                  isHost: e.target.value,
                });
              }}
              required={true}>
              <option value={tableDatas?.user?.isHost}>
                {tableDatas?.user?.isHost === true ? "Host" : "Select"}
              </option>
              <option value={true}>Make Host</option>
              <option value={false}>Disable Host</option>
            </select>
          </div>
          {/* reseller  */}
          <div className="w-full">
            <h4 className="inter-500 mb-2 text-lg leading-6">Reseller</h4>
            <select
              className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              onChange={(e) => {
                setformData({
                  ...formData,
                  isReseller: e.target.value,
                });
              }}
              required={true}>
              <option value={tableDatas?.user?.isReseller}>
                {tableDatas?.user?.isReseller === true ? "Reseller" : "Select"}
              </option>
              <option value={true}>Make Reseller</option>
              <option value={false}>Disable Reseller</option>
            </select>
          </div>
          {/* agent  */}
          <div className="w-full">
            <h4 className="inter-500 mb-2 text-lg leading-6">Agent</h4>
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
              <option value={tableDatas?.user?.is_agent}>
                {tableDatas?.user?.is_agent === true ? "Agent" : "Select"}
              </option>
              <option value={true}>Make Agent</option>
              <option value={false}>Disable Agent</option>
            </select>
          </div>
        </div>

        <div className="mb-5 grid gap-5 lg:mb-[1.875rem]">
          <div className="w-full">
            <div
              onClick={() => handleOnclick()}
              className="rounded border border-[#63C054] bg-[#63AD6F] px-6 py-4 text-center cursor-pointer">
              <span
                type="submit"
                className="inter-600 ml-2.5 text-center text-base leading-[1.3rem] text-white">
                Update{" "}
              </span>
            </div>
          </div>
        </div>
      </form>{" "}
    </div>
  );
};

export default UserRoleUpdate;
