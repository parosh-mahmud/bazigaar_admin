import React, { Fragment, useEffect, useState } from "react";
import PrimaryLayout from "../../Component/layouts/PrimaryLayout";
import { toast } from "react-hot-toast";
import { UnAuth } from "../Auth/UnAuth";
import { ENDPOINT } from "../../App/config/endpoint";
import axios from "axios";
import TablePagination from "../../Component/Shared/TablePagination";
import { SearchIcon } from "../../Assets/icons";
import { Link } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlineEye } from "react-icons/ai";

const tableHead = [
  { id: 1, name: "SL", width: 50 },
  { id: 3, name: "Reseller Name", width: 250 },
  { id: 4, name: "Transition Number", width: 260 },
  { id: 5, name: "Amount", width: 180 },
  { id: 6, name: "BGCOIN", width: 180 },
  { id: 7, name: "Document", width: 120 },
  { id: 8, name: "Status", width: 180 },
  { id: 9, name: "Action", width: 180 },
];
const Request = ({ isLoading, setIsLoading }) => {
  const [searchState, setSearchState] = useState("");
  const [tableDatas, setTableDatas] = useState([]);
  const [tableDatas2, setTableDatas2] = useState([]);
  const token = JSON.parse(localStorage.getItem("authInfo"));
  const handleData = () => {
    axios
      .get(
        // `${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.ticket?.getTicket}`,
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.reseller?.coinList}`,
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
          setTableDatas(res.data);
          setTableDatas2(res.data);
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

  useEffect(() => {
    let arr = [];
    function filter() {
      if (searchState !== "") {
        tableDatas.map((dat) => {
          if (
            dat.reseller_name
              .toLowerCase()
              .search(searchState.toLowerCase()) !== -1
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

  const handleApprove = (e, id) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.reseller.approveDetails}${id}`,
        {},
        {
          headers: {
            Authorization: "token " + token.token,
          },
        }
      )
      .then((res) => {
        if (res.data.type === "error") {
          toast.error("Network Error");
        } else {
          toast.success("Approved");
          handleData();
        }
      })
      .catch((e) => {
        // console.log(e);
        UnAuth(e);
      });
  };
  const handleReject = (e, id) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.reseller.rejectDetails}${id}`,
        {},
        {
          headers: {
            Authorization: "token " + token.token,
          },
        }
      )
      .then((res) => {
        if (res.data.type === "error") {
          toast.error("Network Error");
        } else {
          toast.success("Rejected");
          handleData();
        }
      })
      .catch((e) => {
        // console.log(e)
        UnAuth(e);
      });
  };

  return (
    <Fragment>
      <PrimaryLayout pageTitle="Coin Request">
        <div className="flex flex-col items-center justify-between gap-4 py-10 md:flex-row">
          <div>
            <h3 className="font-poppins text-xl font-semibold text-black lg:text-2xl">
              BGCOIN Request
            </h3>
          </div>

          <div className="flex w-full flex-col items-center gap-4 md:w-[unset] md:flex-row">
            <div className="flex w-full items-center">
              <input
                type="text"
                className="h-[38px] w-full rounded-l-lg border border-black px-4 py-2 focus:border-black focus:outline-none"
                placeholder="Search reseller here..."
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
                  {tableHead?.map((thead) => {
                    return (
                      <th
                        style={{ minWidth: thead.width }}
                        // width={thead.width}
                        key={thead.id}
                        className={`px-2 text-left font-inter text-base font-medium`}>
                        {thead.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="relative w-full">
                {currentItems?.map((tbody, i) => {
                  return (
                    <tr
                      key={i}
                      className="h-20 bg-white text-sm leading-none text-gray-800 hover:bg-gray-100">
                      <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          {(currentPage - 1) * 10 + i + 1 < 10
                            ? `0${(currentPage - 1) * 10 + i + 1}`
                            : (currentPage - 1) * 10 + i + 1}
                        </p>
                      </td>

                      <td className="px-2">
                        <Link
                          to={`/request-details/${tbody?.id}`}
                          className="text-left font-poppins text-base font-normal">
                          {tbody?.reseller_name}
                        </Link>
                      </td>
                      <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          {tbody?.transaction_number}
                        </p>
                      </td>
                      <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          ${tbody?.amount}
                        </p>
                      </td>

                      <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          {tbody?.bgcoin}
                        </p>
                      </td>
                      <td className="px-2">
                      

                        <a
                          href={`${process.env.REACT_APP_MAIN_URL}${tbody?.doc_url}`}
                          target="_blank"
                          rel="noreferrer">

                        <img src={`${process.env.REACT_APP_MAIN_URL}${tbody?.doc_url}`} alt={tbody?.reseller_name} width='40px' height='25px'/> 

                        </a>
                      </td>
                      <td className="px-2">
                        <p
                          className={`rounded-[20px] py-2 text-center font-poppins text-base font-normal capitalize ${
                            tbody?.status === "accepted"
                              ? "bg-[#63AD6F] bg-opacity-10 text-[#63AD6F]"
                              : tbody?.status === "rejected"
                              ? "bg-[#F76868] bg-opacity-10 text-[#F76868]"
                              : "bg-orange-400 bg-opacity-10 text-orange-400"
                          }`}>
                          {tbody?.status}
                        </p>
                      </td>
                      <td className="px-2">
                        <div className="flex h-full items-center gap-5 px-2">
                          <Link to={`/request-details/${tbody?.id}`}>
                            <AiOutlineEye className="text-[28px] text-green-500" />
                          </Link>
                          {tbody?.status === "pending" && (
                            <button
                              onClick={(e) => handleApprove(e, tbody?.id)}>
                              <BsCheckCircle className="text-[22px] text-green-500" />
                            </button>
                          )}
                          {tbody?.status === "pending" && (
                            <button onClick={(e) => handleReject(e, tbody?.id)}>
                              <RxCrossCircled className="text-[24px] text-red-500" />
                            </button>
                          )}
                        </div>
                      </td>
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

export default Request;
