import React, { useState } from "react";

const UpdateScratchCard = ({ scratchcard, onUpdate, onClose }) => {
  // Exchange rate: $1 = 150 bg coin
  const BG_COIN_TO_USD = 1 / 150;
const [isUpdating, setIsUpdating] = useState(false);
const [formData, setFormData] = useState({
  ...scratchcard,
  totalCost: 0,
  profit: 0,
  prizes: scratchcard.prizes || [], // Default to an empty array
});


  const [imagePreview, setImagePreview] = useState(scratchcard.image);

  // Map type to per card price in bg coin
  const typeToPriceMap = {
    "10 Coin": 10,
    "20 Coin": 20,
    "50 Coin": 50,
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let updatedFormData = { ...formData, [name]: value };

    if (name === "type") {
      const perCardPrice = typeToPriceMap[value] || 0;
      updatedFormData.perCardPrice = perCardPrice;
    }

    setFormData(updatedFormData);
    recalculateProfit(updatedFormData);
  };

  // Handle prize input
  const handlePrizeChange = (index, field, value) => {
    const prizes = [...formData.prizes];
    prizes[index][field] = value;

    if (field === "value" || field === "quantity") {
      const prizeValue = parseFloat(prizes[index].value) || 0;
      const prizeQuantity = parseInt(prizes[index].quantity) || 0;
      prizes[index].cost = prizeValue * prizeQuantity;
    }

    const updatedFormData = { ...formData, prizes };
    setFormData(updatedFormData);
    recalculateProfit(updatedFormData);
  };

  // Recalculate total cost and profit
  const recalculateProfit = (data) => {
    const totalCost = data.prizes.reduce((acc, prize) => acc + (prize.cost || 0), 0);
    const totalCards = parseInt(data.totalCards) || 0;
    const perCardPrice = data.perCardPrice || 0;
    const revenue = totalCards * perCardPrice;
    const profit = revenue - totalCost;

    setFormData((prevData) => ({
      ...prevData,
      totalCost,
      profit,
    }));
  };

  // Handle file upload
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5 MB size limit
      alert("File size should not exceed 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  }
};


  // Add new prize tier
  const handleAddPrize = () => {
    setFormData({
      ...formData,
      prizes: [...formData.prizes, { tier: "", value: "", quantity: "", cost: 0 }],
    });
  };

  // Remove prize tier
  const handleRemovePrize = (index) => {
    const prizes = [...formData.prizes];
    prizes.splice(index, 1);
    const updatedFormData = { ...formData, prizes };
    setFormData(updatedFormData);
    recalculateProfit(updatedFormData);
  };

  // Handle update
const handleUpdate = async () => {
  setIsUpdating(true);
  try {
    await onUpdate(formData); // Assuming onUpdate is an async function
    alert("Scratchcard updated successfully!");
    onClose();
  } catch (error) {
    alert("Failed to update scratchcard. Please try again.");
  } finally {
    setIsUpdating(false);
  }
};

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start overflow-y-auto ">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-6">Update Scratchcard</h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Scratchcard Name */}
          <div>
            <label className="block text-sm font-medium">Scratchcard Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select Type</option>
              <option value="10 Coin">10 Coin</option>
              <option value="20 Coin">20 Coin</option>
              <option value="50 Coin">50 Coin</option>
            </select>
          </div>

          {/* Total Cards */}
          <div>
            <label className="block text-sm font-medium">Total Cards</label>
            <input
              type="number"
              name="totalCards"
              value={formData.totalCards}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
              rows="4"
              placeholder="Enter a brief description of the scratchcard"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Image Preview */}
          {/* {imagePreview && (
            <div>
              <label className="block text-sm font-medium text-gray-500">Image Preview</label>
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                className="w-full h-auto rounded border border-gray-300 mt-2"
              />
            </div>
          )} */}
        </div>

        {/* Prize Tiers */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Prize Tiers</h3>
          {/* Column Headers */}
          <div className="grid grid-cols-5 gap-4 font-semibold mb-2">
            <div>Tier Name</div>
            <div>Prize Value (bg coin)</div>
            <div>Quantity</div>
            <div>Cost (bg coin)</div>
            <div>Action</div>
          </div>
          {formData.prizes.map((prize, index) => (
            <div key={index} className="grid grid-cols-5 gap-4 mb-4">
              <input
                type="text"
                placeholder="Tier Name"
                value={prize.tier}
                onChange={(e) => handlePrizeChange(index, "tier", e.target.value)}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="number"
                placeholder="Prize Value (bg coin)"
                value={prize.value}
                onChange={(e) => handlePrizeChange(index, "value", e.target.value)}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={prize.quantity}
                onChange={(e) => handlePrizeChange(index, "quantity", e.target.value)}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                value={parseFloat(prize.cost).toFixed(2)}
                disabled
                className="border border-gray-300 p-2 rounded bg-gray-100"
              />
              <button
                onClick={() => handleRemovePrize(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleAddPrize}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Prize Tier
          </button>
        </div>

        {/* Total Cost and Profit */}
        <div className="mt-6">
          <p className="text-lg font-bold">
            Per Card Price: {formData.perCardPrice} bg coin (~$
            {(formData.perCardPrice * BG_COIN_TO_USD).toFixed(2)})
          </p>
          <p className="text-lg font-bold">
            Total Cost: {formData.totalCost.toFixed(2)} bg coin (~$
            {(formData.totalCost * BG_COIN_TO_USD).toFixed(2)})
          </p>
          <p className="text-lg font-bold">
            Projected Profit: {formData.profit.toFixed(2)} bg coin (~$
            {(formData.profit * BG_COIN_TO_USD).toFixed(2)})
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateScratchCard;
