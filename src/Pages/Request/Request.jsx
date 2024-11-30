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
  { id: 2, name: "User Name", width: 250 },
  { id: 3, name: "Transaction/Bank Number", width: 260 },
  { id: 4, name: "Amount", width: 180 },
  { id: 5, name: "Payment Method", width: 180 },
  { id: 6, name: "Request Date", width: 180 },
  { id: 7, name: "Status", width: 180 },
  { id: 8, name: "Action", width: 180 },
];


const Request = ({ isLoading, setIsLoading }) => {
  const [searchState, setSearchState] = useState("");
  const [activeTab, setActiveTab] = useState("coin"); // "coin" or "withdraw"
  const [coinData, setCoinData] = useState([]);
  const [withdrawData, setWithdrawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const token = JSON.parse(localStorage.getItem("authInfo"));
useEffect(() => {
  if (filteredData.length > 0) {
    console.log("Logging Status for All Items:");
    filteredData.forEach((item) => {
      console.log("Status for item ID:", item.id, "is", item.status);
    });
  } else {
    console.log("No data available to log.");
  }
}, [filteredData]);

  // Fetch Coin Requests
  const fetchCoinData = () => {
    axios
      .get(`${process.env.REACT_APP_MAIN_URL}${ENDPOINT.reseller.coinList}`, {
        headers: {
          Authorization: "Token " + token.token,
        },
      })
      .then((res) => {
        setCoinData(res.data);
        if (activeTab === "coin") setFilteredData(res.data);
      })
      .catch((e) => UnAuth(e));
  };

  // Fetch Withdraw Requests
  const fetchWithdrawData = () => {
    axios
      .get(
        "https://api.bazigaar.com/wallet_app/api/v1/administration/user-withdraw-request/",
        {
          headers: {
            Authorization: "Token " + token.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.results)
        setWithdrawData(res.data.results);
        if (activeTab === "withdraw") setFilteredData(res.data.results);
      })
      .catch((e) => UnAuth(e));
  };

  useEffect(() => {
    fetchCoinData();
    fetchWithdrawData();
  }, []);

  // Filter data based on search input
  useEffect(() => {
    const data = activeTab === "coin" ? coinData : withdrawData;
    const filtered = data.filter((item) =>
      item.reseller_name
        ? item.reseller_name.toLowerCase().includes(searchState.toLowerCase())
        : item.user.first_name.toLowerCase().includes(searchState.toLowerCase())
        
    );
    setFilteredData(filtered);
  }, [searchState, activeTab, coinData, withdrawData]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);

  const handleApprove = (e, id) => {
    e.preventDefault();
    const endpoint =
      activeTab === "coin"
        ? ENDPOINT.reseller.approveDetails
        : `https://api.bazigaar.com/wallet_app/api/v1/administration/approve-withdraw/${id}/`;
    axios
      .post(endpoint, {}, {
        headers: {
          Authorization: "Token " + token.token,
        },
      })
      .then((res) => {
        toast.success("Approved");
        if (activeTab === "coin") fetchCoinData();
        else fetchWithdrawData();
      })
      .catch((e) => UnAuth(e));
  };

  const handleReject = (e, id) => {
    e.preventDefault();
    const endpoint =
      activeTab === "coin"
        ? ENDPOINT.reseller.rejectDetails
        : `https://api.bazigaar.com/wallet_app/api/v1/administration/reject-withdraw/${id}/`;
    axios
      .post(endpoint, {}, {
        headers: {
          Authorization: "Token " + token.token,
        },
      })
      .then((res) => {
        toast.success("Rejected");
        if (activeTab === "coin") fetchCoinData();
        else fetchWithdrawData();
      })
      .catch((e) => UnAuth(e));
  };

  return (
    <Fragment>
      <PrimaryLayout pageTitle="Requests">
        <div className="flex flex-col items-center justify-between gap-4 py-10 md:flex-row">
          <h3 className="font-poppins text-xl font-semibold text-black lg:text-2xl">
            {activeTab === "coin" ? "BGCOIN Requests" : "Withdraw Requests"}
          </h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab("coin")}
              className={`py-2 px-4 ${
                activeTab === "coin"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
             Reseller Coin Requests
            </button>
            <button
              onClick={() => setActiveTab("withdraw")}
              className={`py-2 px-4 ${
                activeTab === "withdraw"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
             User Withdrawal Requests
            </button>
          </div>
        </div>
        <div className="rounded-lg bg-white pb-3 shadow-md">
          <div className="overflow-x-scroll">
            <table className="table-auto w-full border-collapse" style={{ tableLayout: "fixed" }}>

              <thead className="w-full bg-[#F1F3F7]">
                <tr className="h-16 w-full">
                  {tableHead?.map((thead) => (
                    <th
                      key={thead.id}
                      style={{ minWidth: thead.width }}
                      className="px-2 text-left font-inter text-base font-medium"
                    >
                      {thead.name}
                    </th>
                  ))}
                </tr>
              </thead>


             <tbody>
  {currentItems.map((item, i) => (
    
    <tr
      key={i}
      className="h-20 bg-white text-sm text-gray-800 hover:bg-gray-100"
    >
      <td className="px-2">
        {(currentPage - 1) * itemsPerPage + i + 1}
      </td>
      <td className="px-2">
        <Link to={`/request-details/${item?.id}`}>
          {item.reseller_name || `${item.user?.first_name || "N/A"} ${item.user?.last_name || ""}`}
        </Link>
      </td>
      <td className="px-2">{item.transaction_number || item.requestTo?.number || "N/A"}</td>
      <td className="px-2">
        {activeTab === "coin"
          ? `BG Coin{item.bgcoin || 0} BG Coin`
          : ` ${item.requestTo?.amount || "0.00"} Coin`}
      </td>
      <td className="px-2">
        {activeTab === "coin" ? "N/A" : item.requestTo?.bankName || "Unknown"}
      </td>
      <td className="px-2">{new Date(item.created_at).toLocaleDateString()}</td>
      <td className="px-4 py-2 text-center">
  <p
    className={`rounded-[20px] py-1 px-4 capitalize ${
      item.status === "Pending"
        ? "bg-orange-400 text-orange-800"
        : item.status === "Accepted"
        ? "bg-green-400 text-green-800"
        : item.status === "Rejected"
        ? "bg-red-400 text-red-800"
        : "bg-gray-300 text-gray-800"
    }`}
    style={{
      minWidth: "100px",
      display: "inline-block",
      textAlign: "center",
      lineHeight: "1.5", // Ensures proper vertical alignment
    }}
  >
    {item.status || "Unknown"}
  </p>
</td>


      <td className="px-4 py-2 text-center">
  <div className="flex justify-center gap-3">
    <button
      onClick={(e) => handleApprove(e, item.id)}
      className="text-green-500 flex items-center gap-1"
    >
      <BsCheckCircle className="text-[20px]" /> Accept
    </button>
    <button
      onClick={(e) => handleReject(e, item.id)}
      className="text-red-500 flex items-center gap-1"
    >
      <RxCrossCircled className="text-[20px]" /> Deny
    </button>
    <button
      
      className="text-blue-500 flex items-center gap-1"
    >
      <AiOutlineEye className="text-[20px]" /> Check User Activities
    </button>
  </div>
</td>

    </tr>
  ))}
</tbody>


            </table>
          </div>
          <TablePagination
            data={filteredData}
            currentPage={currentPage}
            setcurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </PrimaryLayout>
    </Fragment>
  );
};

export default Request;
