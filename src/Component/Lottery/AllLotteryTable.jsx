import React, { Fragment, useEffect, useState } from "react";
import { PlusIcon, SearchIcon } from "../../Assets/icons";
import TablePagination from "../Shared/TablePagination";
import { ENDPOINT } from "../../App/config/endpoint";
import DeleteCompo from "../Shared/DeleteCompo";
import SmallModal from "../Modals/SmallModal";
import UpdateLottery from "./UpdateLottery";
import Modal from "../Modals/Modal";

const tableHead = [
  { id: 1, name: "SL", width: 10 },
  { id: 2, name: "Image", width: 40 },
  { id: 3, name: "Ticket Name", width: 250 },
  { id: 11, name: "Type", width: 50 },
  { id: 4, name: "Price per ticket", width: 170 },
  { id: 5, name: "Ticket Qty", width: 140 },
  { id: 6, name: "Sold Ticket", width: 140 },
  { id: 7, name: "Start Date - Draw Date", width: 200 },
  { id: 8, name: "Draw Status", width: 150 },
  // { id: 9, name: "Status", width: 40 },
  { id: 10, name: "Action", width: 40 },
];

const AllLotteryTable = ({
  handleData,
  handleModal,
  isLoading,
  setIsLoading,
  tableDatas,
  tableDatas2,
  setTableDatas2,
  activeLottery
}) => {
  const [searchState, setSearchState] = useState("");
console.log(activeLottery)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalContent2, setModalContent2] = useState("");

  useEffect(() => {
    setModalOpen(false);
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

  const handleDelete = (e, id, DltTitle) => {
    e.preventDefault();
    const endpoint = `${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.ticket?.deActiveTicket}${id}`;
    setModalOpen(true);
    setModalContent(
      <DeleteCompo
        setModalOpen={setModalOpen}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        id={id}
        handleData={handleData}
        DltTitle={`delete ${DltTitle}`}
        endpoint={endpoint}
      />
    );
  };
  const handleEdit = (e, id) => {
    e.preventDefault();
    setModalOpen2(true);
    setModalContent2(
      <UpdateLottery
        setModalOpen={setModalOpen2}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        id={id}
        handleData={handleData}
      />
    );
  };

  return (
    <Fragment>
      <div className="flex flex-col items-center justify-between gap-4 py-10 md:flex-row">
        <div>
          <h3 className="font-poppins text-xl font-semibold text-black lg:text-2xl">
            Lottery Phases
          </h3>
          <h3 className="font-poppins text-xl font-semibold text-black lg:text-2xl">
            Active Lottery {activeLottery}
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
          <div className="w-full">
            <button
              onClick={(e) => handleModal(e)}
              className="flex h-[38px] w-full items-center justify-center gap-3 rounded-lg border border-black bg-black px-6 py-2 text-base font-semibold text-white">
              <PlusIcon />
              <span>Create Lottery</span>
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
                        {tbody?.type}
                      </p>
                    </td>
                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody?.Price} Coin
                      </p>
                    </td>
                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody?.NumberOfTickets}
                      </p>
                    </td>
                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody?.tickets_sold}
                      </p>
                    </td>
                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody?.OpeningTime.split("T")[0] +
                          " : " +
                          tbody?.OpeningTime.split("T")[1].split(":00Z")[0] +
                          " - " +
                          (tbody?.ClosingTime.split("T")[0] +
                            " : " +
                            tbody?.ClosingTime.split("T")[1].split(":00Z")[0])}
                      </p>
                    </td>
                    <td className="px-2">
                      <p
                        className={`${
                          tbody?.isDrawComplete === true
                            ? "bg-[#ca755924] text-[#c14029]"
                            : "bg-[#63ad6f24] text-[#63AD6F]"
                        } low w-fit rounded-full px-3 py-2 font-inter text-[14px] font-medium capitalize`}>
                        {tbody?.isDrawComplete === true ? "Closed" : "Running"}
                      </p>
                    </td>

                    {/* <td className="cursor-pointer px-2">
                      <input
                        className="checked:after:bg-primary checked:focus:border-primary checked:focus:bg-primary dark:checked:bg-primary dark:checked:after:bg-primary mr-4 h-7 w-14 appearance-none rounded-full bg-[#E4E4E4] before:pointer-events-none before:absolute before:h-7 before:w-7 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:h-7 after:w-7 after:rounded-full after:border-none after:bg-[#0D0D10] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-[#0D0D10] checked:after:absolute checked:after:z-[2] checked:after:ml-[1.8rem] checked:after:h-7 checked:after:w-7 checked:after:rounded-full checked:after:border-none  checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12]  focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-7 focus:after:w-7 focus:after:rounded-full focus:after:content-[''] checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 dark:bg-neutral-600 dark:after:bg-neutral-400"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault01"
                      />
                      
                    </td> */}
                    <td className="px-2">
                      <div className="flex items-center gap-3">
                        <svg
                          onClick={(e) =>
                            handleEdit(e, tbody?.LotteryId, tbody?.LotteryName)
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
      <SmallModal
        title="Delete Lottery"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalContent={modalContent}
      />

      <Modal
        title="Update Lottery"
        modalOpen={modalOpen2}
        setModalOpen={setModalOpen2}
        modalContent={modalContent2}
      />
    </Fragment>
  );
};

export default AllLotteryTable;
