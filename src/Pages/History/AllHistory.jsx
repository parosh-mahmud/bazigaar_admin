import React, { Fragment, useEffect, useState } from "react";
import PrimaryLayout from "../../Component/layouts/PrimaryLayout";
import { SearchIcon } from "../../Assets/icons";
import { toast } from "react-hot-toast";
import { UnAuth } from "../../Pages/Auth/UnAuth";
import { ENDPOINT } from "../../App/config/endpoint";
import axios from "axios";
import TablePagination from "../../Component/Shared/TablePagination";
import { Link } from "react-router-dom";

const tableHead = [
  { id: 1, name: "SL", width: 10 },
  { id: 2, name: "Image", width: 40 },
  { id: 3, name: "Ticket Name", width: 250 },
  { id: 4, name: "Price", width: 120 },
  { id: 5, name: "Ticket Qty", width: 140 },
  { id: 6, name: "Sold Ticket History", width: 180 },
  { id: 7, name: "Draw Ticket History", width: 180 },
];
const AllHistory = ({ isLoading, setIsLoading }) => {
  const [searchState, setSearchState] = useState("");
  const [tableDatas, setTableDatas] = useState([]);
  const [tableDatas2, setTableDatas2] = useState([]);
  const token = JSON.parse(localStorage.getItem("authInfo"));

  const handleData = () => {
    axios
      .get(
        // `${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.ticket?.getTicket}`,
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.ticket?.getTicket}`,
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
          let temp = res.data;
          temp = temp.reverse();
          setTableDatas(temp);
          setTableDatas2(temp);
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
            dat.LotteryName.toLowerCase().search(searchState.toLowerCase()) !==
            -1
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
      <PrimaryLayout pageTitle="All History">
        <div className="flex flex-col items-center justify-between gap-4 py-10 md:flex-row">
          <div>
            <h3 className="font-poppins text-xl font-semibold text-black lg:text-2xl">
              History Phases
            </h3>
          </div>

          <div className="flex w-full flex-col items-center gap-4 md:w-[unset] md:flex-row">
            <div className="flex w-full items-center">
              <input
                type="text"
                className="h-[38px] w-full rounded-l-lg border border-black px-4 py-2 focus:border-black focus:outline-none"
                placeholder="Search lottery here..."
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
                        <div className="h-10 w-10">
                          <img
                            className="h-full w-full"
                            // src={`${process.env.REACT_APP_MAIN_URL}${tbody?.image_banner}`}
                            src={tbody?.image_banner}
                            alt={tbody?.LotteryName}
                          />
                        </div>
                      </td>
                      <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          {tbody?.LotteryName}
                        </p>
                      </td>
                      <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          ${tbody?.Price}
                        </p>
                      </td>
                      <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          {tbody?.NumberOfTickets}
                        </p>
                      </td>
                      <td className="px-2">
                        <Link
                          to={`/history/sold-lottery/${tbody?.LotteryId}`}
                          className="rounded-full border border-gray-700 px-3 py-1 text-center font-poppins text-base font-normal hover:bg-gray-700 hover:text-white">
                          View Sold Ticket
                        </Link>
                      </td>
                      <td className="px-2">
                        <Link
                          to={`/history/draw-winner/${tbody?.LotteryId}`}
                          className="rounded-full border border-gray-700 px-3 py-1 text-center font-poppins text-base font-normal hover:bg-gray-700 hover:text-white">
                          View Draw Ticket
                        </Link>
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

export default AllHistory;
