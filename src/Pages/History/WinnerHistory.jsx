import React, { Fragment, useState } from "react";
import PrimaryLayout from "../../Component/layouts/PrimaryLayout";

const WinnersHistory = () => {
  const [activeTab, setActiveTab] = useState("lotteryWinners"); // Default main tab
  const [filterPrize, setFilterPrize] = useState("all"); // Default filter for Lottery Winners
  const [modalData, setModalData] = useState(null); // Modal data

  const renderTable = () => {
    if (activeTab === "lotteryWinners") {
      return (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Lottery Winners</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600">Pending: {countStatus("Pending")}</span>
              <span className="text-sm font-medium text-gray-600">Completed: {countStatus("Completed")}</span>
            </div>
          </div>
          <div className="mb-4">
            <select
              className="p-2 border border-gray-300 rounded"
              value={filterPrize}
              onChange={(e) => setFilterPrize(e.target.value)}
            >
              <option value="all">All Prizes</option>
              <option value="1st">1st Prize</option>
              <option value="2nd">2nd Prize</option>
              <option value="3rd">3rd Prize</option>
            </select>
          </div>
          {renderSubTable("lotteryWinners")}
        </div>
      );
    }

    if (activeTab === "scratchCardWinners") {
      return (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-4">Scratch Card Winners</h2>
          {renderSubTable("scratchCardWinners")}
        </div>
      );
    }
  };

  const countStatus = (status) => {
    const demoData = [
      { id: 1, status: "Completed" },
      { id: 2, status: "Pending" },
    ];

    return demoData.filter((data) => data.status === status).length;
  };

  const handleStatusChange = (id, newStatus) => {
    // Add logic to update status in your database or state
    console.log(`Status for ID ${id} changed to ${newStatus}`);
  };

  const renderSubTable = (type) => {
    let demoData;
    switch (type) {
      case "lotteryWinners":
        demoData = [
          { id: 1, username: "John Doe", eventName: "Mega Draw", eventId: "E001", prize: "iPhone 16 Pro Max", drawDate: "2024-12-19 14:30", status: "Completed", prizeCategory: "1st" },
          { id: 2, username: "Jane Smith", eventName: "Holiday Bonanza", eventId: "E002", prize: "100 Coin", drawDate: "2024-12-18 16:00", status: "Pending", prizeCategory: "3rd" },
        ];
        break;
      case "scratchCardWinners":
        demoData = [
          { id: 1, username: "Alice Johnson", eventName: "Scratch Mania", eventId: "S001", prize: "50 Coin", drawDate: "2024-12-17 10:00", status: "Completed" },
          { id: 2, username: "Bob Brown", eventName: "Lucky Scratch", eventId: "S002", prize: "iPhone 16 Plus", drawDate: "2024-12-18 12:00", status: "Pending" },
        ];
        break;
      default:
        demoData = [];
    }

    const filteredData =
      type === "lotteryWinners"
        ? demoData.filter((data) => filterPrize === "all" || data.prizeCategory === filterPrize)
        : demoData;

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">SL</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Event Name</th>
              <th className="border border-gray-300 px-4 py-2">Event ID</th>
              <th className="border border-gray-300 px-4 py-2">Prize</th>
              <th className="border border-gray-300 px-4 py-2">Draw Date and Time</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr key={data.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td
                  className="border border-gray-300 px-4 py-2 text-blue-500 cursor-pointer"
                  onClick={() => setModalData(data)}
                >
                  {data.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">{data.eventName}</td>
                <td className="border border-gray-300 px-4 py-2">{data.eventId}</td>
                <td className="border border-gray-300 px-4 py-2">{data.prize}</td>
                <td className="border border-gray-300 px-4 py-2">{data.drawDate}</td>
                <td className="border border-gray-300 px-4 py-2 text-green-500">{data.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    className="p-1 border border-gray-300 rounded"
                    defaultValue={data.status}
                    onChange={(e) => handleStatusChange(data.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Fragment>
      <PrimaryLayout pageTitle="Winners History">
        <div className="px-4 py-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("lotteryWinners")}
              className={`px-6 py-2 rounded ${
                activeTab === "lotteryWinners" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400`}
            >
              Lottery Winners
            </button>
            <button
              onClick={() => setActiveTab("scratchCardWinners")}
              className={`px-6 py-2 rounded ${
                activeTab === "scratchCardWinners" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400`}
            >
              Scratch Card Winners
            </button>
          </div>
          <div className="winners-table">{renderTable()}</div>
        </div>

        {modalData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
              <h3 className="text-lg font-semibold mb-4">Shipping Details</h3>
              <p><strong>Username:</strong> {modalData.username}</p>
              <p><strong>Prize:</strong> {modalData.prize}</p>
              <p><strong>Event:</strong> {modalData.eventName}</p>
              <p><strong>Draw Date:</strong> {modalData.drawDate}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setModalData(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </PrimaryLayout>
    </Fragment>
  );
};

export default WinnersHistory;
