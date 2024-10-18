import React, { Fragment, useEffect, useState } from "react";
import PrimaryLayout from "../../Component/layouts/PrimaryLayout";
import { SearchIcon } from "../../Assets/icons";
import { toast } from "react-hot-toast";
import { UnAuth } from "../../Pages/Auth/UnAuth";
import { ENDPOINT } from "../../App/config/endpoint";
import axios from "axios";
import TablePagination from "../../Component/Shared/TablePagination";
import { useParams } from "react-router-dom";

const tableHead = [
  { id: 1, name: "SL", width: 10 },
  { id: 2, name: "User Id", width: 40 },
  { id: 3, name: "User Input", width: 120 },
  { id: 4, name: "Quantity", width: 120 },
  { id: 5, name: "Purchase Time", width: 140 },
  { id: 6, name: "User Lucky Number", width: 180 },
];
const LotteryHistory = ({ isLoading, setIsLoading }) => {
  const [searchState, setSearchState] = useState("");
  const [tableDatas, setTableDatas] = useState([]);
  const [tableDatas2, setTableDatas2] = useState([]);
  const token = JSON.parse(localStorage.getItem("authInfo"));
  const id = useParams();

  const handleData = () => {
    axios
      .get(
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.ticket?.soldLottery}${id?.id}`,
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
          console.log("res.data", res.data);
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
            dat.userInput.toLowerCase().search(searchState.toLowerCase()) !==
              -1 ||
            dat.lotteryId.toLowerCase().search(searchState.toLowerCase()) !== -1
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
      <PrimaryLayout pageTitle="All Sold Ticket">
        <div className="flex flex-col items-center justify-between gap-4 py-10 md:flex-row">
          <div>
            <h3 className="font-poppins text-xl font-semibold text-black lg:text-2xl">
              Sold Ticket History
            </h3>
          </div>

          <div className="flex w-full flex-col items-center gap-4 md:w-[unset] md:flex-row">
            <div className="flex w-full items-center">
              <input
                type="text"
                className="h-[38px] w-full rounded-l-lg border border-black px-4 py-2 focus:border-black focus:outline-none"
                placeholder="Search here..."
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
                          {i + 1 < 10 ? `0${i + 1}` : i + 1}
                        </p>
                      </td>

                      <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          {tbody?.userId}
                        </p>
                      </td>
                      <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          {tbody?.userInput}
                        </p>
                      </td>
                      <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          {tbody?.quantity}
                        </p>
                      </td>
                      <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          {tbody?.purchaseTime.split("T")[0] +
                            " : " +
                            tbody?.purchaseTime.split("T")[1].split(".")[0]}
                        </p>
                      </td>
                      <td className="px-2">
                        <p className="text-left font-poppins text-base font-normal">
                          {tbody?.userLuckyNumber}
                        </p>
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

export default LotteryHistory;
