import React, { useState } from "react";
import PrimaryLayout from "../layouts/PrimaryLayout";
import CreateNewScratchcard from "./CreateNewScratchCard";
import UpdateScratchCard from "./UpdateScratchCard";

const Scratchcards = () => {
  const [scratchcards, setScratchcards] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/50",
      name: "Scratchcard A",
      price: "$5",
      type: "20 Coin",
      status: "Active",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/50",
      name: "Scratchcard B",
      price: "$10",
      type: "50 Coin",
      status: "Inactive",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedScratchcard, setSelectedScratchcard] = useState(null);

  const handleAddScratchcard = (newScratchcard) => {
    setScratchcards([...scratchcards, { ...newScratchcard, id: scratchcards.length + 1 }]);
  };

  const handleUpdateScratchcard = (updatedScratchcard) => {
    const updatedList = scratchcards.map((card) =>
      card.id === updatedScratchcard.id ? updatedScratchcard : card
    );
    setScratchcards(updatedList);
  };

  const handleDelete = (id) => {
    setScratchcards(scratchcards.filter((card) => card.id !== id));
  };

  return (
    <PrimaryLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All Scratchcards</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowCreateModal(true)}
        >
          + Create Scratchcard
        </button>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">SL</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Scratchcard Name</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scratchcards.map((scratchcard, index) => (
              <tr key={scratchcard.id}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">
                  <img src={scratchcard.image} alt={scratchcard.name} className="w-12 h-12" />
                </td>
                <td className="border border-gray-300 p-2">{scratchcard.name}</td>
                <td className="border border-gray-300 p-2">{scratchcard.price}</td>
                <td className="border border-gray-300 p-2">{scratchcard.type}</td>
                <td className="border border-gray-300 p-2">{scratchcard.status}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => {
                      setSelectedScratchcard(scratchcard);
                      setShowUpdateModal(true);
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
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
    </PrimaryLayout>
  );
};

export default Scratchcards;
