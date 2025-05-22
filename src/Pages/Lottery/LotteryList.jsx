// src/Pages/Lottery/LotteryList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PrimaryLayout from "../../Component/layouts/PrimaryLayout";
import { ENDPOINT } from "../../App/config/endpoint";
import { toast } from "react-hot-toast";
import { UnAuth } from "../Auth/UnAuth";

export default function LotteryList() {
  const [lotteries, setLotteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLotteries() {
      try {
        const token = JSON.parse(localStorage.getItem("authInfo"))?.token;
        const res = await axios.get(
          `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.ticket.getTicket}`,
          {
            headers: { Authorization: "Token " + token },
          }
        );
        setLotteries(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          UnAuth(err);
        } else {
          toast.error(
            err.response?.data?.message || "Failed to load lotteries"
          );
        }
      } finally {
        setLoading(false);
      }
    }
    fetchLotteries();
  }, []);

  if (loading) {
    return (
      <PrimaryLayout pageTitle="Lotteries">
        <div className="p-4 text-center">Loading lotteries...</div>
      </PrimaryLayout>
    );
  }

  return (
    <PrimaryLayout pageTitle="Lotteries">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {lotteries.map((lot) => (
          <div
            key={lot.LotteryId}
            className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden"
          >
            <img
              src={lot.image_banner}
              alt={lot.LotteryName}
              className="h-40 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{lot.LotteryName}</h3>
              <p className="text-sm text-gray-600">
                Remaining: {lot.remaining_time}
              </p>
              <p className="text-sm text-gray-600">
                Sold: {lot.tickets_sold}/{lot.NumberOfTickets}
              </p>
              <button
                onClick={() =>
                  navigate(`/manage-lottery/${lot.LotteryId}/winners`)
                }
                className="mt-2 w-full inline-block text-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Winners
              </button>
            </div>
          </div>
        ))}
      </div>
    </PrimaryLayout>
  );
}
