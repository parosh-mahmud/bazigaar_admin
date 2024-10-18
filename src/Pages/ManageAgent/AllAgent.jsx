import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { SearchIcon } from "../../Assets/icons";
import PrimaryLayout from "../../Component/layouts/PrimaryLayout";
import TablePagination from "../../Component/Shared/TablePagination";
import { UnAuth } from "../Auth/UnAuth";
import { ENDPOINT } from "../../App/config/endpoint";
import SmallModal from "../../Component/Modals/SmallModal";
import UpdateRole from "./UpdateRole";

const tableHead = [
  { id: 1, name: "SL", width: 60 },
  { id: 2, name: "Agent", width: 40 },
  { id: 3, name: "Agent Name", width: 220 },
  { id: 4, name: "Email-Phone", width: 180 },
  { id: 6, name: "Country", width: 100 },
  { id: 7, name: "Joined At", width: 180 },
  { id: 8, name: "Role", width: 60 },
  { id: 9, name: "Action", width: 40 },
];

const AllAgent = ({ isLoading, setIsLoading }) => {
  const [searchState, setSearchState] = useState("");
  const [tableDatas, setTableDatas] = useState([]);
  const [tableDatas2, setTableDatas2] = useState([]);

  // fetching user data
  const getAllInfo = () => {
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
          setTableDatas(res.data);
          setTableDatas2(res.data);
        }
      })
      .catch((e) => {
        // console.log(e)
        UnAuth(e);
      });
  };

  useEffect(() => {
    getAllInfo();
  }, []);

  //   pagination
  useEffect(() => {
    let arr = [];
    function filter() {
      if (searchState !== "") {
        tableDatas.map((dat) => {
          if (
            dat.username.toLowerCase().search(searchState.toLowerCase()) !==
              -1 ||
            dat.email.toLowerCase().search(searchState.toLowerCase()) !== -1
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

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleEdit = (e, id, username, role) => {
    e.preventDefault();
    setModalOpen(true);
    setModalContent(
      <UpdateRole
        setModalOpen={setModalOpen}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        username={username}
        role={role}
        handleData={getAllInfo}
        endpoint={`${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.user?.updateUser}${id}`}
      />
    );
  };
  return (
    <Fragment>
      <PrimaryLayout pageTitle="Manage Agent">
        <div className="flex flex-col items-center justify-between gap-4 py-10 md:flex-row">
          <div>
            <h3 className="font-poppins text-xl font-semibold text-black lg:text-2xl">
              All Agent
            </h3>
          </div>

          <div className="flex w-full flex-col items-center gap-4 md:w-[unset] md:flex-row">
            <div className="flex w-full items-center">
              <input
                type="text"
                className="h-[38px] w-full rounded-l-lg border border-black px-4 py-2 focus:border-black focus:outline-none"
                placeholder="Search agent here..."
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
                {currentItems.map((tbody, i) => {
                  const WithoutT = tbody.date_joined.split("T");
                  const set = new Set(WithoutT);
                  const [first] = set;
                  return (
                    tbody?.is_agent === true && (
                      <tr
                        key={tbody.id}
                        className="h-20 bg-white text-sm leading-none text-gray-800 hover:bg-gray-100">
                        <td className="px-2">
                          <p className="text-left font-poppins text-base font-normal">
                            {(currentPage - 1) * 10 + i + 1 < 10
                              ? `0${(currentPage - 1) * 10 + i + 1}`
                              : (currentPage - 1) * 10 + i + 1}
                          </p>
                        </td>
                        <td className="px-2">
                          <div className="h-10 w-10">
                            {tbody.profile_picture !== null ? (
                              <img
                                className="h-full w-full"
                                src={`${process.env.REACT_APP_MAIN_URL}${tbody?.profile_picture}`}
                                // src={tbody?.profile_picture}
                                alt={tbody?.username}
                              />
                            ) : (
                              <p className="text-left font-poppins text-base font-normal">
                                N/A
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-2">
                          <p className="text-left font-poppins text-base font-normal">
                            {tbody?.first_name !== "" && tbody?.last_name !== ""
                              ? (tbody?.first_name, tbody?.last_name)
                              : "N/A"}
                          </p>
                        </td>
                        <td className="px-2">
                          <p className="text-left font-poppins text-base font-normal">
                            {tbody?.email} - {tbody?.countryCode}
                            {tbody?.phoneNumber}
                          </p>
                        </td>
                        <td className="px-2">
                          <p className="text-left font-poppins text-base font-normal">
                            {tbody?.country === null ? "N/A" : tbody?.country}
                          </p>
                        </td>
                        <td className="px-2">
                          <p className="text-left font-poppins text-base font-normal">
                            {first}
                          </p>
                        </td>
                        <td className="px-2">
                          {tbody?.is_agent ? (
                            <p
                              className={`w-fit rounded-full
                           bg-[#63ad6f24] px-3 py-2 font-inter text-[14px] font-medium text-[#63AD6F]`}>
                              Agent
                            </p>
                          ) : (
                            <p
                              className={`w-fit rounded-full
                             bg-[#f768682b] px-3 py-2 font-inter text-[14px] font-medium text-[#F76868]`}>
                              N/A
                            </p>
                          )}
                        </td>
                        <td className="px-2">
                          <svg
                            onClick={(e) =>
                              handleEdit(
                                e,
                                tbody?.id,
                                tbody?.username,
                                tbody?.is_agent
                              )
                            }
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
                        </td>

                        {/* <td className="relative px-2">
                        <div
                          className="rounded-full"
                          onClick={() => setShow(!show)}>
                          {show ? (
                            <ul className="absolute top-5 right-5 z-10 min-w-[200px] rounded border-r bg-white p-10 shadow">
                              <li className="w-full cursor-pointer items-center justify-between text-gray-700 hover:text-indigo-700">
                                Edit
                              </li>
                              <li className="mt-4 w-full cursor-pointer items-center justify-between text-gray-700 hover:text-indigo-700">
                                Block
                              </li>
                              <li className="mt-4 w-full cursor-pointer items-center justify-between text-gray-700 hover:text-indigo-700">
                                View Details
                              </li>
                            </ul>
                          ) : (
                            ""
                          )}
                          <button className="relative px-2">
                            <ThreeDotIcon />
                          </button>
                        </div>
                      </td> */}
                      </tr>
                    )
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

      <SmallModal
        title="Edit Agent"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalContent={modalContent}
      />
    </Fragment>
  );
};

export default AllAgent;
