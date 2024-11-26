import React, { useState, useEffect } from "react";
import CreateNewScratchcard from "./CreateNewScratchCard";
import UpdateScratchCard from "./UpdateScratchCard";

const Scratchcards = () => {
  const BG_COIN_TO_USD = 1 / 150;
  const [scratchcards, setScratchcards] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedScratchcard, setSelectedScratchcard] = useState(null);
  const token = JSON.parse(localStorage.getItem("authInfo"));
console.log(token);
  // Fetch scratchcards from the API
  const fetchScratchcards = async () => {
    try {
      const response = await fetch(
        "https://api.bazigaar.com/api/v1/admin/scratchcards/",
        {
          headers: {
             Authorization: "Token " + token.token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch scratchcards");
      }
      const data = await response.json();
      setScratchcards(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching scratchcards:", error);
    }
  };

// Delete scratchcard
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this scratchcard?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://api.bazigaar.com/api/v1/admin/scratchcards/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Token " + token.token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete scratchcard");
      }
      // Remove deleted scratchcard from the state
      setScratchcards(scratchcards.filter((scratchcard) => scratchcard.id !== id));
      alert("Scratchcard deleted successfully!");
    } catch (error) {
      console.error("Error deleting scratchcard:", error);
      alert("Failed to delete scratchcard. Please try again.");
    }
  };
// Update scratchcard
  const handleUpdateScratchcard = async (id, updatedData) => {
    try {
      const response = await fetch(
        `https://api.bazigaar.com/api/v1/admin/scratchcards/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token.token,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update scratchcard");
      }

      const updatedScratchcard = await response.json();

      // Update the state with the updated scratchcard
      setScratchcards((prevScratchcards) =>
        prevScratchcards.map((scratchcard) =>
          scratchcard.id === id ? updatedScratchcard : scratchcard
        )
      );

      alert("Scratchcard updated successfully!");
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating scratchcard:", error);
      alert("Failed to update scratchcard. Please try again.");
    }
  };
  
  useEffect(() => {
    fetchScratchcards();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Scratchcards</h1>
      <button
        className="bg-black text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowCreateModal(true)}
      >
        + Create Scratchcard
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">SL</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Scratchcard Name</th>
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Total Cards</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Prize Details</th>
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
                    src={scratchcard.product_image || "https://via.placeholder.com/50"}
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
                  {scratchcard.total_cards}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {scratchcard.status}
                </td>
                <td className="border border-gray-300 p-2">
                  <ul>
                    {scratchcard.prize_tiers.map((prize) => (
                      <li key={prize.id}>
                        {prize.tier_name}: {prize.prize_value} (x{prize.quantity})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border border-gray-300 p-2 text-center">
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
      </div>

      {showCreateModal && (
        <CreateNewScratchcard
          onSave={() => console.log("Create functionality")}
          onClose={() => setShowCreateModal(false)}
        />
      )}
      {showUpdateModal && selectedScratchcard && (
        <UpdateScratchCard
          scratchcard={selectedScratchcard}
          onUpdate={() => console.log("Update functionality")}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
};

export default Scratchcards;
