import React, { Fragment, useState } from "react";
import PrimaryLayout from "../../Component/layouts/PrimaryLayout";

const TransactionHistory = () => {
  const [activeTab, setActiveTab] = useState("userTransactions"); // Default main tab
  const [subTab, setSubTab] = useState("deposit"); // Default sub-tab
  const [filterText, setFilterText] = useState("");

  const renderTable = () => {
    if (activeTab === "userTransactions") {
      return (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-4">User Transactions</h2>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setSubTab("deposit")}
              className={`px-4 py-2 rounded ${
                subTab === "deposit" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400`}
            >
              Deposit
            </button>
            <button
              onClick={() => setSubTab("withdraw")}
              className={`px-4 py-2 rounded ${
                subTab === "withdraw" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400`}
            >
              Withdraw
            </button>
            <button
              onClick={() => setSubTab("userToUser")}
              className={`px-4 py-2 rounded ${
                subTab === "userToUser" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400`}
            >
              User to User
            </button>
          </div>
          {renderSubTable(subTab)}
        </div>
      );
    }

    switch (activeTab) {
      case "resellerTransactions":
        return (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-4">Reseller & User Transactions</h2>
            {renderSubTable("resellerTransactions")}
          </div>
        );
      case "adminTransactions":
        return (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-4">Reseller & Admin Transactions</h2>
            {renderSubTable("adminTransactions")}
          </div>
        );
      default:
        return <p className="text-gray-600">Select a tab to view transactions.</p>;
    }
  };

  const renderSubTable = (type) => {
    let demoData;
    switch (type) {
      case "deposit":
        demoData = [
          { id: 1, username: "John Doe", amount: "100 coin", date: "2024-12-19 14:30", status: "Completed" },
          { id: 2, username: "Jane Smith", amount: "200 coin", date: "2024-12-19 15:00", status: "Rejected" },
        ];
        break;
      case "withdraw":
        demoData = [
          { id: 1, username: "Alice Johnson", amount: "50 coin", date: "2024-12-18 12:00", status: "Completed" },
          { id: 2, username: "Bob Brown", amount: "75 coin", date: "2024-12-18 14:00", status: "Failed" },
        ];
        break;
      case "userToUser":
        demoData = [
          { id: 1, username: "Charlie Davis", sendUser: "John Doe", receiptUser: "Eve Walker", amount: "30 coin", date: "2024-12-17 16:30", status: "Completed" },
          { id: 2, username: "Eve Walker", sendUser: "Alice Johnson", receiptUser: "Bob Brown", amount: "100 coin", date: "2024-12-17 17:00", status: "Completed" },
        ];
        break;
      case "resellerTransactions":
        demoData = [
          {
            id: 1,
            username: "Mike Ross",
            resellerName: "Harvey Specter",
            resellerCountry: "USA",
            amount: "150 coin",
            date: "2024-12-19 10:30",
            status: "Completed",
          },
          {
            id: 2,
            username: "Rachel Zane",
            resellerName: "Donna Paulsen",
            resellerCountry: "Canada",
            amount: "250 coin",
            date: "2024-12-19 11:00",
            status: "Rejected",
          },
        ];
        break;
      default:
        demoData = [];
    }

    const filteredData = demoData.filter((data) =>
      data.username.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
      <div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Filter by username"
            className="w-full p-2 border border-gray-300 rounded"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">SL</th>
                <th className="border border-gray-300 px-4 py-2">Username</th>
                {type === "userToUser" && (
                  <>
                    <th className="border border-gray-300 px-4 py-2">Send User</th>
                    <th className="border border-gray-300 px-4 py-2">Receipt User</th>
                  </>
                )}
                {type === "resellerTransactions" && (
                  <>
                    <th className="border border-gray-300 px-4 py-2">Reseller Name</th>
                    <th className="border border-gray-300 px-4 py-2">Reseller Country</th>
                  </>
                )}
                <th className="border border-gray-300 px-4 py-2">Amount</th>
                <th className="border border-gray-300 px-4 py-2">Time and Date</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={data.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{data.username}</td>
                  {type === "userToUser" && (
                    <>
                      <td className="border border-gray-300 px-4 py-2">{data.sendUser}</td>
                      <td className="border border-gray-300 px-4 py-2">{data.receiptUser}</td>
                    </>
                  )}
                  {type === "resellerTransactions" && (
                    <>
                      <td className="border border-gray-300 px-4 py-2">{data.resellerName}</td>
                      <td className="border border-gray-300 px-4 py-2">{data.resellerCountry}</td>
                    </>
                  )}
                  <td className="border border-gray-300 px-4 py-2">{data.amount}</td>
                  <td className="border border-gray-300 px-4 py-2">{data.date}</td>
                  <td className="border border-gray-300 px-4 py-2 text-green-500">{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <PrimaryLayout pageTitle="Transaction History">
        <div className="px-4 py-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => {
                setActiveTab("userTransactions");
                setSubTab("deposit");
              }}
              className={`px-6 py-2 rounded ${
                activeTab === "userTransactions" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400`}
            >
              User Transactions
            </button>
            <button
              onClick={() => setActiveTab("resellerTransactions")}
              className={`px-6 py-2 rounded ${
                activeTab === "resellerTransactions" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400`}
            >
              Reseller & User Transactions
            </button>
            <button
              onClick={() => setActiveTab("adminTransactions")}
              className={`px-6 py-2 rounded ${
                activeTab === "adminTransactions" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400`}
            >
              Reseller & Admin Transactions
            </button>
          </div>
          <div className="transaction-table">{renderTable()}</div>
        </div>
      </PrimaryLayout>
    </Fragment>
  );
};

export default TransactionHistory;
