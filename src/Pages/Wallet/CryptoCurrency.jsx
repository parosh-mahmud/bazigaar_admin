import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusIcon, SearchIcon } from "../../Assets/icons";
import PrimaryLayout from "../../Component/layouts/PrimaryLayout";
import TablePagination from "../../Component/Shared/TablePagination";
import DeleteCompo from "../../Component/Shared/DeleteCompo";
import SmallModal from "../../Component/Modals/SmallModal";
import CreateCrypto from "../../Component/Wallet/CreateCrypto";
import { ENDPOINT } from "../../App/config/endpoint";
import { UnAuth } from "../Auth/UnAuth";
import { toast } from "react-hot-toast";
import { WalletID } from "../../Assets/locales/WalletID";
const tableHead = [
  { id: 1, name: "SL", width: 10 },
  { id: 2, name: "Image", width: 40 },
  { id: 7, name: "Network Name", width: 150 },
  { id: 3, name: "Network Type", width: 150 },
  { id: 4, name: "Crypto Address", width: 300 },
  // { id: 5, name: "Status", width: 40 },
  { id: 6, name: "Action", width: 40 },
];

const CryptoCurrency = ({ isLoading, setIsLoading }) => {
  const [searchState, setSearchState] = useState("");
  const [tableDatas, setTableDatas] = useState([]);
  const [tableDatas2, setTableDatas2] = useState([]);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(
    <CreateCrypto setModalOpen={setModalOpen} />
  );

  const getData = async () => {
    const token = JSON.parse(localStorage.getItem("authInfo"));
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.wallet.getCrypto}${
          WalletID().wallet_id
        }/`,
        {
          headers: {
            Authorization: "Token " + token.token,
          },
        }
      );
      if (response.status === "error") {
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
            dat.networkName.toLowerCase().search(searchState.toLowerCase()) !==
              -1 ||
            dat.address.toLowerCase().search(searchState.toLowerCase()) !== -1
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

  const handleModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
    setModalContent(
      <CreateCrypto setModalOpen={setModalOpen} getData={getData} />
    );
  };

  const handleDelete = (e, id, DltTitle) => {
    e.preventDefault();
    const endpoint = `${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.wallet.deleteCrypto}${id}`;
    setModalOpen(true);
    setModalContent(
      <DeleteCompo
        setModalOpen={setModalOpen}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        id={id}
        handleData={getData}
        DltTitle={`delete ${DltTitle}`}
        endpoint={endpoint}
      />
    );
  };

  return (
    <PrimaryLayout pageTitle="Wallet">
      <div className="flex flex-col items-center justify-between gap-4 py-10 md:flex-row">
        <div>
          <h3 className="font-poppins text-xl font-semibold text-black lg:text-2xl">
            Crypto Currency
          </h3>
        </div>

        <div className="flex w-full flex-col items-center gap-4 md:w-[unset] md:flex-row">
          <div className="flex w-full items-center">
            <input
              type="text"
              className="h-[38px] w-full rounded-l-lg border border-black px-4 py-2 focus:border-black focus:outline-none"
              placeholder="Search crypto here..."
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
              <span>Create New Crypto</span>
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
                          src={tbody?.Image}
                          alt={tbody?.networkName}
                        />
                      </div>
                    </td>
                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody?.networkName}
                      </p>
                    </td>

                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody?.cryptoName}
                      </p>
                    </td>
                    <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody?.address}
                      </p>
                    </td>
                    {/* <td className="px-2">
                      <p className="text-left font-poppins text-base font-normal">
                        {tbody?.created_at.split("T")[0] +
                          " : " +
                          tbody?.created_at.split("T")[1].split(".")[0]}
                      </p>
                    </td> */}
                    <td className="px-2">
                      {" "}
                      <svg
                        onClick={(e) =>
                          handleDelete(e, tbody?.id, tbody?.networkName)
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
        title="Crypto Currency"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalContent={modalContent}
      />
    </PrimaryLayout>
  );
};

export default CryptoCurrency;
