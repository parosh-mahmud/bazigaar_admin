import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDotIcon, SearchIcon } from "../../Assets/icons";
import PrimaryLayout from "../../Component/layouts/PrimaryLayout";
import TablePagination from "../../Component/Shared/TablePagination";
import SmallModal from "../../Component/Modals/SmallModal";
import { ENDPOINT } from "../../App/config/endpoint";
import { UnAuth } from "../Auth/UnAuth";
import { toast } from "react-hot-toast";
import WithdrawStatus from "../../Component/Shared/WithdrawStatus";
const tableHead = [
  { id: 1, name: "SL", width: 10 },
  { id: 2, name: "Image", width: 40 },
  { id: 3, name: "User Name", width: 100 },
  { id: 4, name: "Email", width: 100 },
  { id: 5, name: "Bank Name", width: 100 },
  { id: 6, name: "Number", width: 100 },
  { id: 7, name: "Amount", width: 100 },
  { id: 8, name: "Status", width: 40 },
  { id: 9, name: "Action", width: 40 },
];

const MobileWithdraw = ({ isLoading, setIsLoading }) => {
  const [searchState, setSearchState] = useState("");
  const [tableDatas, setTableDatas] = useState([]);
  const [tableDatas2, setTableDatas2] = useState([]);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const getData = async () => {
    const token = JSON.parse(localStorage.getItem("authInfo"));
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.withdraw.mobileWithdraw}`,
        {
          headers: {
            Authorization: "Token " + token.token,
          },
        }
      );
      if (response.data.status === "error") {
        console.log(response.data.status)
        toast.error(response.data.msg);
      } else {
        console.log("response.data", response.data);
        let temp = response?.data?.results;
        setTableDatas(temp);
        setTableDatas2(temp);
      }
    } catch (error) {
      // console.error("error", error);
      UnAuth(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let arr = [];
    function filter() {
      if (searchState !== "") {
        tableDatas.map((dat) => {
          if (
            dat?.requestTo?.amount
              .toLowerCase()
              .search(searchState.toLowerCase()) !== -1 ||
            dat?.user?.email.toLowerCase().search(searchState.toLowerCase()) !==
              -1 ||
            dat?.requestTo?.bankName
              .toLowerCase()
              .search(searchState.toLowerCase()) !== -1 ||
            dat?.requestTo?.number
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

  const handleDelete = (e, id, amount) => {
    e.preventDefault();
    const endpoint = `${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.withdraw.mobileWithdrawStatus}${id}/`;
    setModalOpen(true);
    setModalContent(
      <WithdrawStatus
        setModalOpen={setModalOpen}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        id={id}
        amount={amount}
        handleData={getData}
        endpoint={endpoint}
      />
    );
  };

  return (
    <PrimaryLayout pageTitle="Mobile Withdraw">
      <div className="flex flex-col items-center justify-between gap-4 py-10 md:flex-row">
        <div>
          <h3 className="font-poppins text-xl font-semibold text-black lg:text-2xl">
            Withdraw Amount
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

                          src={`${tbody?.user?.profile_picture}`}
                              alt={tbody?.user?.username}

                        />
                      </div>
                    </td>

                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {`${
                          tbody?.user?.first_name === "" &&
                          tbody?.user?.last_name === ""
                            ? "N/A"
                            : tbody?.user?.first_name +
                              " " +
                              tbody?.user?.last_name
                        }`}
                      </p>
                    </td>
                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody?.user?.email === "" ? "N/A" : tbody?.user?.email}
                      </p>
                    </td>
                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody?.requestTo?.bankName}
                      </p>
                    </td>
                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody?.requestTo?.number}
                      </p>
                    </td>
                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody?.requestTo?.amount}
                      </p>
                    </td>
                    <td className="px-2">
                      <p
                        className={`rounded-[20px] py-2 text-center font-poppins text-base font-normal capitalize ${
                          tbody?.status === "Accepted"
                            ? "bg-[#63AD6F] bg-opacity-10 text-[#63AD6F]"
                            : tbody?.status === "Rejected"
                            ? "bg-[#F76868] bg-opacity-10 text-[#F76868]"
                            : "bg-orange-400 bg-opacity-10 text-orange-400"
                        }`}>
                        {tbody?.status}
                      </p>
                    </td>
                    {/* action  */}
                    <td className="px-2">
                      {tbody?.status === "Pending" ? (
                        <span
                          onClick={(e) =>
                            handleDelete(e, tbody?.id, tbody?.requestTo?.amount)
                          }
                          className="flex cursor-pointer items-center justify-center">
                          <ThreeDotIcon />
                        </span>
                      ) : (
                        <span>N/A</span>
                      )}
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
        title="Update Mobile Withdraw"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalContent={modalContent}
      />
    </PrimaryLayout>
  );
};

export default MobileWithdraw;
