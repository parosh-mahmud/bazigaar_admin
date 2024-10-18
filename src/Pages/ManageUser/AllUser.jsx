import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { SearchIcon } from "../../Assets/icons";
import PrimaryLayout from "../../Component/layouts/PrimaryLayout";
import TablePagination from "../../Component/Shared/TablePagination";
import { UnAuth } from "../Auth/UnAuth";
import { ENDPOINT } from "../../App/config/endpoint";
import { Link } from "react-router-dom";

const tableHead = [
  { id: 1, name: "User ID", width: 80 },
  { id: 2, name: "Image", width: 40 },
  { id: 3, name: "User Name", width: 270 },
  { id: 4, name: "Email-Phone", width: 180 },
  { id: 5, name: "Balance", width: 100 },
  // { id: 6, name: "Country", width: 100 },
  { id: 7, name: "Joined At", width: 180 },
  { id: 8, name: "Activity", width: 60 },
  // { id: 9, name: "Action", width: 80 },
];

const AllUser = ({ isLoading, setIsLoading }) => {
  const [searchState, setSearchState] = useState("");
  const [tableDatas, setTableDatas] = useState([]);
  const [tableDatas2, setTableDatas2] = useState([]);
  // fetching user data
  const getAllUserInfo = () => {
    const token = JSON.parse(localStorage.getItem("authInfo"));

    axios
      .get(`${process.env.REACT_APP_MAIN_URL}/api${ENDPOINT.user.allUser}`, {
        headers: {
          Authorization: "token " + token.token,
        },
      })
      .then((res) => {
        if (res.data.type === "error") {
          toast.error(res.data.msg);
        } else {
          console.log(res.data);
          setTableDatas(res.data);
          setTableDatas2(res.data);
        }
      })
      .catch((e) => {
        UnAuth(e);
      });
  };

  useEffect(() => {
    getAllUserInfo();
  }, []);

  //   pagination
  useEffect(() => {
    let arr = [];
    function filter() {
      if (searchState !== "") {
        tableDatas.map((dat) => {
          if (
            dat?.first_name.toLowerCase().search(searchState.toLowerCase()) !==
              -1 ||
            dat?.email.toLowerCase().search(searchState.toLowerCase()) !== -1
          ) {
            arr.push(dat);
          }
          return true;
        });
      } else {
        tableDatas.map((dat) => {
          arr.push(dat);
          return true;
        });
      }
      return arr;
    }
    filter();
    setTableDatas2(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState]);

  // pagination state
  const [data, setData] = useState(tableDatas2);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setData(tableDatas2);
    setcurrentPage(1);
  }, [tableDatas2]);

  return (
    <Fragment>
      <PrimaryLayout pageTitle="Manage Users">
        <div className="flex flex-col items-center justify-between gap-4 py-10 md:flex-row">
          <div>
            <h3 className="font-poppins text-xl font-semibold text-black lg:text-2xl">
              All User
            </h3>
          </div>

          <div className="flex w-full flex-col items-center gap-4 md:w-[unset] md:flex-row">
            <div className="flex w-full items-center">
              <input
                type="text"
                className="h-[38px] w-full rounded-l-lg border border-black px-4 py-2 focus:border-black focus:outline-none"
                placeholder="Search User Name/ Email Address"
                defaultValue={searchState}
                onChange={(e) => setSearchState(e.target.value)}
                required={true}
              />
              <button
                className="h-[38px] rounded-r-lg border border-black bg-black px-3 py-2 text-base font-semibold text-white"
                title="">
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white pb-3 shadow-md">
          <div className="overflow-x-scroll">
            <table className="w-full">
              <thead className="w-full bg-[#F1F3F7]">
                <tr className="h-16 w-full">
                  {tableHead.map((thead) => {
                    return (
                      <th
                        style={{ minWidth: thead.width }}
                        key={thead.id}
                        className={`px-2 text-left font-inter text-base font-medium`}>
                        {thead.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="w-full">
                {currentItems.map((tbody) => {
                  const WithoutT = tbody.date_joined.split("T");
                  const set = new Set(WithoutT);
                  const [first] = set;
                  return (
                    <tr
                      key={tbody?.id}
                      className="h-20 bg-white text-sm leading-none text-gray-800 hover:bg-gray-100">
                      <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          {tbody?.id2 < 10 ? `0${tbody?.id2}` : tbody?.id2}
                        </p>
                      </td>
                      <td className="px-2">
                        <div className="h-10 w-10">
                          <Link to={`/manage-users/user-details/${tbody.id}`}>
			
                            {tbody?.profile_picture !== "" ? (
                              <img
                                className="h-full w-full"

                                src={`${process.env.REACT_APP_MAIN_URL}${tbody?.profile_picture}`}
                              alt={tbody?.username}
			/>

                            ) : (
                              "N/A"
                            )}
                          </Link>
                        </div>
                      </td>
                      <td className="px-2">
                        <Link
                          to={`/manage-users/user-details/${tbody?.id}`}
                          className="text-left font-poppins text-base font-normal">
                          {tbody?.first_name} {tbody?.last_name}
                        </Link>
                      </td>
                      <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          {tbody?.email} - {tbody?.countryCode}
                          {tbody?.phoneNumber}
                        </p>
                      </td>
                      <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          {tbody?.bgcoin}
                        </p>
                      </td>
                      {/* <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          {tbody?.countryCode === null
                            ? "N/A"
                            : tbody?.countryCode}
                        </p>
                      </td> */}
                      <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          {first}
                        </p>
                      </td>
                      <td className="px-2">
                        {tbody?.is_active ? (
                          <p
                            className={`w-fit rounded-full
                           bg-[#63ad6f24] px-3 py-2 font-inter text-[14px] font-medium text-[#63AD6F]`}>
                            Active
                          </p>
                        ) : (
                          <p
                            className={`w-fit rounded-full
                             bg-[#f768682b] px-3 py-2 font-inter text-[14px] font-medium text-[#F76868]`}>
                            InActive
                          </p>
                        )}
                      </td>

                      {/* <td className="px-4">
                        <div className="flex items-center gap-3">
                          <svg
                            // onClick={(e) =>
                            //   handleEdit(e, tbody?.LotteryId, tbody?.LotteryName)
                            // }
                            className="cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="17"
                            viewBox="0 0 18 17"
                            fill="none">
                            <path
                              d="M11.2815 3.19257L2.63473 11.8393L1.5 16L5.66069 14.8653L14.3074 6.21853M11.2815 3.19257L12.8473 1.6267C13.046 1.42801 13.2819 1.2704 13.5415 1.16287C13.8011 1.05534 14.0793 1 14.3603 1C14.6413 1 14.9195 1.05534 15.1791 1.16287C15.4387 1.2704 15.6746 1.42801 15.8733 1.6267C16.072 1.82538 16.2296 2.06126 16.3371 2.32086C16.4447 2.58045 16.5 2.85869 16.5 3.13968C16.5 3.42066 16.4447 3.6989 16.3371 3.95849C16.2296 4.21809 16.072 4.45397 15.8733 4.65266L14.3074 6.21853M11.2815 3.19257L14.3074 6.21853"
                              stroke="#0EAB8B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <svg
                            onClick={(e) =>
                              handleDelete(
                                e,
                                tbody?.LotteryId,
                                tbody?.LotteryName
                              )
                            }
                            className="cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="17"
                            viewBox="0 0 12 17"
                            fill="none">
                            <path
                              d="M2.49998 4.2V2.6C2.49998 2.17565 2.66855 1.76869 2.96861 1.46863C3.26866 1.16857 3.67563 1 4.09998 1H7.29998C7.72432 1 8.13129 1.16857 8.43135 1.46863C8.7314 1.76869 8.89998 2.17565 8.89998 2.6V4.2M10.3 4.2H1.09998V14.4C1.09998 14.8243 1.26855 15.2313 1.5686 15.5314C1.86866 15.8314 2.27563 16 2.69998 16H8.69998C9.12432 16 9.53129 15.8314 9.83135 15.5314C10.1314 15.2313 10.3 14.8243 10.3 14.4V9.8V4.2Z"
                              stroke="#FE7062"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <TablePagination
            data={data}
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </PrimaryLayout>
    </Fragment>
  );
};

export default AllUser;
