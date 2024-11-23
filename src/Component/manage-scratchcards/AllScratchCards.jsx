import React, { useState } from "react";
import PrimaryLayout from "../layouts/PrimaryLayout";
import CreateNewScratchcard from "./CreateNewScratchCard";
import UpdateScratchCard from "./UpdateScratchCard";

const Scratchcards = () => {
  // Exchange rate: $1 = 150 bg coin
  const BG_COIN_TO_USD = 1 / 150;

  const [scratchcards, setScratchcards] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/50",
      name: "Lucky Fortune",
      type: "20 Coin",
      totalCards: 8000,
      perCardPrice: 20,
      totalCost: 11000,
      profit: 149000,
      prizes: [
        { tier: "Top Prize", value: "2000", quantity: "1", cost: 2000 },
        { tier: "2nd Prize", value: "200", quantity: "10", cost: 2000 },
        { tier: "3rd Prize", value: "20", quantity: "100", cost: 2000 },
        { tier: "4th Prize", value: "10", quantity: "500", cost: 5000 },
      ],
      status: "Active",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/50",
      name: "Golden Scratch",
      type: "50 Coin",
      totalCards: 10000,
      perCardPrice: 50,
      totalCost: 27500,
      profit: 472500,
      prizes: [
        { tier: "Top Prize", value: "5000", quantity: "1", cost: 5000 },
        { tier: "2nd Prize", value: "500", quantity: "10", cost: 5000 },
        { tier: "3rd Prize", value: "50", quantity: "100", cost: 5000 },
        { tier: "4th Prize", value: "25", quantity: "500", cost: 12500 },
      ],
      status: "Inactive",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedScratchcard, setSelectedScratchcard] = useState(null);

  // Handle adding a new scratchcard
  const handleAddScratchcard = (newScratchcard) => {
    setScratchcards([
      ...scratchcards,
      { ...newScratchcard, id: scratchcards.length + 1 },
    ]);
  };

  // Handle updating an existing scratchcard
  const handleUpdateScratchcard = (updatedScratchcard) => {
    const updatedList = scratchcards.map((card) =>
      card.id === updatedScratchcard.id ? updatedScratchcard : card
    );
    setScratchcards(updatedList);
  };

  // Handle deleting a scratchcard
  const handleDelete = (id) => {
    setScratchcards(scratchcards.filter((card) => card.id !== id));
  };

  return (
  
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All Scratchcards</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowCreateModal(true)}
        >
          + Create Scratchcard
        </button>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">SL</th>
                <th className="border border-gray-300 p-2">Image</th>
                <th className="border border-gray-300 p-2">Scratchcard Name</th>
                <th className="border border-gray-300 p-2">Type</th>
                <th className="border border-gray-300 p-2">Total Cards</th>
                <th className="border border-gray-300 p-2">Per Card Price</th>
                <th className="border border-gray-300 p-2">Total Cost</th>
                <th className="border border-gray-300 p-2">Projected Profit</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scratchcards.map((scratchcard, index) => (
                <tr key={scratchcard.id}>
                  <td className="border border-gray-300 p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <img
                      src={scratchcard.image}
                      alt={scratchcard.name}
                      className="w-12 h-12 mx-auto"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    {scratchcard.name}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {scratchcard.type}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {scratchcard.totalCards}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {scratchcard.perCardPrice} bg coin (~$
                    {(scratchcard.perCardPrice * BG_COIN_TO_USD).toFixed(2)})
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {scratchcard.totalCost} bg coin (~$
                    {(scratchcard.totalCost * BG_COIN_TO_USD).toFixed(2)})
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {scratchcard.profit} bg coin (~$
                    {(scratchcard.profit * BG_COIN_TO_USD).toFixed(2)})
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {scratchcard.status}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => {
                        setSelectedScratchcard(scratchcard);
                        setShowUpdateModal(true);
                      }}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2 mb-2 md:mb-0"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(scratchcard.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showCreateModal && (
          <CreateNewScratchcard
            onSave={handleAddScratchcard}
            onClose={() => setShowCreateModal(false)}
          />
        )}
        {showUpdateModal && selectedScratchcard && (
          <UpdateScratchCard
            scratchcard={selectedScratchcard}
            onUpdate={handleUpdateScratchcard}
            onClose={() => setShowUpdateModal(false)}
          />
        )}
      </div>
  
  );
};

export default Scratchcards;
