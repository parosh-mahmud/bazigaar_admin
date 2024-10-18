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

const ActiveUser = ({ isLoading, setIsLoading }) => {
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
              Active User
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
                {currentItems.map((tbody, i) => {
                  const WithoutT = tbody.date_joined.split("T");
                  const set = new Set(WithoutT);
                  const [first] = set;
                  return (
                    tbody?.is_active === true && (
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

                        <td className="px-2">
                          <p className="text-left font-poppins text-base font-normal">
                            {first}
                          </p>
                        </td>
                        <td className="px-2">
                          {tbody?.is_active && (
                            <p
                              className={`w-fit rounded-full
                           bg-[#63ad6f24] px-3 py-2 font-inter text-[14px] font-medium text-[#63AD6F]`}>
                              Active
                            </p>
                          )}
                        </td>
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
    </Fragment>
  );
};

export default ActiveUser;
