import React, { useState } from "react";

const CreateNewScratchcard = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    type: "",
    totalCards: 0,
    description: "",
    status: "Active",
    prizes: [],
    totalCost: 0,
    profit: 0,
    perCardPrice: 0,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Exchange rate: $1 = 150 bg coin
  const BG_COIN_TO_USD = 1 / 150;

  // Map type to per card price in bg coin
  const typeToPriceMap = {
    "10 Coin": 10, // 10 bg coin
    "20 Coin": 20, // 20 bg coin
    "50 Coin": 50, // 50 bg coin
  };

  // Suggested setups based on type
  const suggestedSetups = {
    "10 Coin": {
      totalCards: 5000,
      prizes: [
        { tier: "Top Prize", value: "1000", quantity: "1", cost: 1000 },
        { tier: "2nd Prize", value: "100", quantity: "10", cost: 1000 },
        { tier: "3rd Prize", value: "10", quantity: "100", cost: 1000 },
        { tier: "4th Prize", value: "5", quantity: "500", cost: 2500 },
      ],
    },
    "20 Coin": {
      totalCards: 8000,
      prizes: [
        { tier: "Top Prize", value: "2000", quantity: "1", cost: 2000 },
        { tier: "2nd Prize", value: "200", quantity: "10", cost: 2000 },
        { tier: "3rd Prize", value: "20", quantity: "100", cost: 2000 },
        { tier: "4th Prize", value: "10", quantity: "500", cost: 5000 },
      ],
    },
    "50 Coin": {
      totalCards: 10000,
      prizes: [
        { tier: "Top Prize", value: "5000", quantity: "1", cost: 5000 },
        { tier: "2nd Prize", value: "500", quantity: "10", cost: 5000 },
        { tier: "3rd Prize", value: "50", quantity: "100", cost: 5000 },
        { tier: "4th Prize", value: "25", quantity: "500", cost: 12500 },
      ],
    },
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Handle type selection and suggest setup
  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    const perCardPrice = typeToPriceMap[selectedType] || 0;

    // Get suggested setup
    const suggestedSetup = suggestedSetups[selectedType] || {
      totalCards: 0,
      prizes: [],
    };

    // Calculate total cost and profit
    const totalCost = suggestedSetup.prizes.reduce(
      (acc, prize) => acc + (parseFloat(prize.cost) || 0),
      0
    );
    const profit = calculateProfit(
      suggestedSetup.totalCards,
      perCardPrice,
      totalCost
    );

    setFormData({
      ...formData,
      type: selectedType,
      perCardPrice,
      totalCards: suggestedSetup.totalCards,
      prizes: suggestedSetup.prizes,
      totalCost,
      profit,
    });
  };

  // Handle total cards change
  const handleTotalCardsChange = (e) => {
    const totalCards = parseInt(e.target.value) || 0;
    setFormData({
      ...formData,
      totalCards,
      profit: calculateProfit(
        totalCards,
        formData.perCardPrice,
        formData.totalCost
      ),
    });
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

    const totalCost = prizes.reduce(
      (acc, prize) => acc + (prize.cost || 0),
      0
    );
    setFormData({
      ...formData,
      prizes,
      totalCost,
      profit: calculateProfit(
        formData.totalCards,
        formData.perCardPrice,
        totalCost
      ),
    });
  };

  // Calculate profit
  const calculateProfit = (totalCards, perCardPrice, totalCost) => {
    const revenue = totalCards * perCardPrice;
    return revenue - totalCost;
  };

  // Handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
      setErrors({ ...errors, image: "" });
    }
  };

  // Handle save
  const handleSave = () => {
    onSave(formData);
    setImagePreview(null);
    onClose();
  };

  // Add new prize tier
  const handleAddPrize = () => {
    setFormData({
      ...formData,
      prizes: [
        ...formData.prizes,
        { tier: "", value: "", quantity: "", cost: 0 },
      ],
    });
  };

  // Remove prize tier
  const handleRemovePrize = (index) => {
    const prizes = [...formData.prizes];
    prizes.splice(index, 1);
    const totalCost = prizes.reduce(
      (acc, prize) => acc + (prize.cost || 0),
      0
    );
    setFormData({
      ...formData,
      prizes,
      totalCost,
      profit: calculateProfit(
        formData.totalCards,
        formData.perCardPrice,
        totalCost
      ),
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start overflow-y-auto">
      <div className="bg-white p-4 md:p-6 rounded shadow-lg w-full max-w-4xl mx-2 md:mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Create New Scratchcard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g., Lucky Fortune, Golden Scratch"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleTypeChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
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
              placeholder="Enter total number of cards"
              value={formData.totalCards}
              onChange={handleTotalCardsChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 p-2 rounded mt-1"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Enter a brief description of the scratchcard"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              rows="4"
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500">
                Image Preview
              </label>
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                className="w-full h-auto rounded border border-gray-300 mt-2"
              />
            </div>
          )}
        </div>

        {/* Prize Tiers */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Prize Tiers</h3>
          {/* Column Headers */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 font-semibold mb-2">
            <div>Tier Name</div>
            <div>Prize Value (bg coin)</div>
            <div>Quantity</div>
            <div>Cost (bg coin)</div>
            <div>Action</div>
          </div>
          {formData.prizes.map((prize, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 mb-4"
            >
              <input
                type="text"
                placeholder="Tier Name"
                value={prize.tier}
                onChange={(e) =>
                  handlePrizeChange(index, "tier", e.target.value)
                }
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="number"
                placeholder="Prize Value (bg coin)"
                value={prize.value}
                onChange={(e) =>
                  handlePrizeChange(index, "value", e.target.value)
                }
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={prize.quantity}
                onChange={(e) =>
                  handlePrizeChange(index, "quantity", e.target.value)
                }
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
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
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
        <div className="flex flex-col md:flex-row justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded mb-2 md:mb-0 md:mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewScratchcard;
