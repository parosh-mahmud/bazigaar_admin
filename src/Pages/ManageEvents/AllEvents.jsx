import React, { useEffect, useState } from "react";
import { PlusIcon, SearchIcon } from "../../Assets/icons";
import PrimaryLayout from "../../Component/layouts/PrimaryLayout";
import TablePagination from "../../Component/Shared/TablePagination";
import Modal from "../../Component/Modals/Modal";
import CreateEvents from "../../Component/Events/CreateEvents";
const tableHead = [
  { id: 1, name: "SL", width: 10 },
  { id: 2, name: "Thumnail", width: 40 },
  { id: 3, name: "Title", width: 220 },
  { id: 4, name: "Host", width: 180 },
  { id: 5, name: "url", width: 180 },
  { id: 6, name: "Start Date & Time", width: 160 },
  { id: 7, name: "Category", width: 120 },
  { id: 8, name: "Status", width: 40 },
  { id: 9, name: "Action", width: 40 },
];
const tableData = [
  {
    id: 1,
    videoThumnail: "https://cdn.tuk.dev/assets/templates/olympus/projects.png",
    title: "Title",
    host: "Host Name",
    url: "url",
    startDate: "2023-02-20",
    startTime: "04:27 AM",
    category: "Category",
    status: "",
  },
  {
    id: 2,
    videoThumnail: "https://cdn.tuk.dev/assets/templates/olympus/projects.png",
    title: "Title",
    host: "Host Name",
    url: "url",
    startDate: "2023-02-20",
    startTime: "04:27 AM",
    category: "Category",
    status: "",
  },
  {
    id: 3,
    videoThumnail: "https://cdn.tuk.dev/assets/templates/olympus/projects.png",
    title: "Title",
    host: "Host Name",
    url: "url",
    startDate: "2023-02-20",
    startTime: "04:27 AM",
    category: "Category",
    status: "",
  },
];
const AllEvents = () => {
  const [searchState, setSearchState] = useState("");
  const [tableDatas, setTableDatas] = useState(tableData);
  const [tableDatas2, setTableDatas2] = useState(tableData);
  // const [toggleOn, setToggleOn] = useState("transform translate-x-7");
  // const [toggleBgOn, setToggleBgOn] = useState("black");

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const handleModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
    setModalContent(<CreateEvents setModalOpen={setModalOpen} />);
  };
  useEffect(() => {
    setTableDatas(tableData);
  }, []);

  useEffect(() => {
    let arr = [];
    function filter() {
      if (searchState !== "") {
        tableDatas.map((dat) => {
          if (
            dat.ticketName.toLowerCase().search(searchState.toLowerCase()) !==
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

  // const handleToggleOff = (e) => {
  //   setToggleOff(e.target.checked ===false ? toggleOff : toggleOn);
  //   setToggleBgOff(e.target.checked === false ? toggleBgOff : toggleBgOn);
  // };

  return (
    <PrimaryLayout pageTitle="Manage Events">
      <div className="flex flex-col items-center justify-between gap-4 py-10 md:flex-row">
        <div>
          <h3 className="font-poppins text-xl font-semibold text-black lg:text-2xl">
            All Events
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
              title=""
            >
              <SearchIcon />
            </button>
          </div>
          <div className="w-full">
            <button
              onClick={(e) => handleModal(e)}
              className="flex h-[38px] w-full items-center justify-center gap-3 rounded-lg border border-black bg-black px-6 py-2 text-base font-semibold text-white"
            >
              <PlusIcon />
              <span>Create New Events</span>
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
                      // width={thead.width}
                      key={thead.id}
                      className={`px-2 text-left font-inter text-base font-medium`}
                    >
                      {thead.name}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="w-full">
              {currentItems.map((tbody) => {
                return (
                  <tr
                    key={tbody.id}
                    className="h-20 bg-white text-sm leading-none text-gray-800 hover:bg-gray-100"
                  >
                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody.id < 10 ? `0${tbody.id}` : tbody.id}
                      </p>
                    </td>
                    <td className="px-2">
                      <div className="h-10 w-10">
                        <img
                          className="h-full w-full"
                          src={tbody.videoThumnail}
                          alt={tbody.title}
                        />
                      </div>
                    </td>
                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody.title}
                      </p>
                    </td>
                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody.host}
                      </p>
                    </td>
                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        <a
                          href={tbody.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {tbody.url}
                        </a>
                      </p>
                    </td>
                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody.startDate}
                        <br />
                        {tbody.startTime}
                      </p>
                    </td>
                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody.category}
                      </p>
                    </td>

                    {/* <td className="px-2">
                      {tbody.status === "Active" ? (
                        <label className="relative flex w-max cursor-pointer select-none items-center">
                          {/* <input
                            type="checkbox"
                            className={`h-7 w-14 cursor-pointer appearance-none rounded-full transition-colors focus:outline-none ${
                              tbody.status === "Active"
                                ? toggleBgOn
                                : toggleBgOff
                            }`}
                            onChange={(e) => handleToggleOn(e)}
                            checked
                          /> 
                          <span
                            className={`absolute right-7 h-7 w-7 rounded-full bg-white transition-transform ${
                              tbody.status === "Active" ? toggleOn : toggleOff
                            }`}
                          />
                        </label>
                      ) : (
                        <label className="relative flex w-max cursor-pointer select-none items-center">
                          <input
                            type="checkbox"
                            className={`h-7 w-14 cursor-pointer appearance-none rounded-full transition-colors focus:outline-none ${
                              tbody.status === "Active"
                                ? toggleBgOn
                                : toggleBgOff
                            }`}
                            onChange={(e) => handleToggleOn(e)}
                          />
                          <span
                            className={`absolute right-7 h-7 w-7 rounded-full bg-white transition-transform ${
                              tbody.status === "Active" ? toggleOn : toggleOff
                            }`}
                          />
                        </label>
                      )}
                    </td> */}
                    <td className="px-2">
                      <div className="flex items-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="17"
                          viewBox="0 0 18 17"
                          fill="none"
                        >
                          <path
                            d="M11.2815 3.19257L2.63473 11.8393L1.5 16L5.66069 14.8653L14.3074 6.21853M11.2815 3.19257L12.8473 1.6267C13.046 1.42801 13.2819 1.2704 13.5415 1.16287C13.8011 1.05534 14.0793 1 14.3603 1C14.6413 1 14.9195 1.05534 15.1791 1.16287C15.4387 1.2704 15.6746 1.42801 15.8733 1.6267C16.072 1.82538 16.2296 2.06126 16.3371 2.32086C16.4447 2.58045 16.5 2.85869 16.5 3.13968C16.5 3.42066 16.4447 3.6989 16.3371 3.95849C16.2296 4.21809 16.072 4.45397 15.8733 4.65266L14.3074 6.21853M11.2815 3.19257L14.3074 6.21853"
                            stroke="#0EAB8B"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="17"
                          viewBox="0 0 12 17"
                          fill="none"
                        >
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
      <Modal
        title="Add New Slider"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalContent={modalContent}
      />
    </PrimaryLayout>
  );
};

export default AllEvents;
